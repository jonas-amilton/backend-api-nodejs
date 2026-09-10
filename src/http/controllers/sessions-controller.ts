import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export class SessionsController {
  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateBodySchema.parse(request.body)

    // TODO: implementar restante do login
    //       criar entidade user no banco de dados

    const user = { id: 'user-id-uuid', role: 'ADMIN' }
    // const userId = request.user.sub

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
  }
}
