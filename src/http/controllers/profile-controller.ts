import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../../use-cases/get-user-profile'

export class ProfileController {
  private usersRepository: PrismaUsersRepository

  constructor() {
    this.usersRepository = new PrismaUsersRepository()
  }

  async profile(request: FastifyRequest, reply: FastifyReply) {
    const getUserProfile = new GetUserProfileUseCase(this.usersRepository)

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.createdAt,
      },
    })
  }
}
