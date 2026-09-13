import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../interface/users-repository'
import { User } from '../../domain/entities/user'
import { CreateUserDTO } from '../../dtos/create-user-dto'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
