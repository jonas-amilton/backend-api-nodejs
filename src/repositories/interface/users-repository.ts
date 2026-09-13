import { User } from '../../domain/entities/user'
import { CreateUserDTO } from '../../dtos/create-user-dto'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserDTO): Promise<User>
  findById(id: string): Promise<User | null>
}
