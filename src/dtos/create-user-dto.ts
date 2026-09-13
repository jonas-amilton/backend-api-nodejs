import { Role } from '@prisma/client'

export interface CreateUserDTO {
  name: string
  email: string
  password_hash: string
  role: Role
}
