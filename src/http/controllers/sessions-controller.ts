import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../../use-cases/authenticate'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export class SessionsController {
  private usersRepository: PrismaUsersRepository
  private readonly MAX_AGE = 60 * 60 * 24 * 7

  constructor() {
    this.usersRepository = new PrismaUsersRepository()
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateBodySchema.parse(request.body)
    try {
      const authenticateUseCase = new AuthenticateUseCase(this.usersRepository)

      const { user } = await authenticateUseCase.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
            expiresIn: '86400',
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
            expiresIn: '7d',
          },
        },
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          httpOnly: true,
          maxAge: this.MAX_AGE,
        })
        .status(200)
        .send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true })

    const { role } = request.user
    const userId = request.user.sub

    const token = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: userId,
          expiresIn: '15m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: userId,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        maxAge: this.MAX_AGE,
      })
      .status(200)
      .send({ token })
  }

  async logout(_request: FastifyRequest, reply: FastifyReply) {
    return reply
      .clearCookie('refreshToken', {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
      })
      .status(200)
      .send({ message: 'Logged out successfully.' })
  }
}
