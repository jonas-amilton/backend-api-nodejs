import { Role } from '@prisma/client'

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: Role
  createdAt: Date
}
