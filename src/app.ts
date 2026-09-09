import fastify, { FastifyError } from 'fastify'
import cors from '@fastify/cors'
import { videoRoutes } from './http/routes/videos.routes'

export const app = fastify({
  logger: process.env.NODE_ENV !== 'test',
})

app.register(cors, {
  origin: true,
})

app.get('/', () => {
  return { message: 'Video API is running' }
})

app.get('/health', async () => {
  return { status: 'ok' }
})

app.register(videoRoutes, { prefix: '/api/v1' })

app.setErrorHandler((error: FastifyError, _request, reply) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
