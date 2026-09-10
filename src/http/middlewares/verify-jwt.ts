import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error)
    }

    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
