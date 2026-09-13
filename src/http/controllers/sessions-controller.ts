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

      return reply.status(200).send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
