import fastify, { FastifyError } from 'fastify'
import cors from '@fastify/cors'
import { videoRoutes } from './http/routes/videos.routes'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { sessionsRoutes } from './http/routes/sessions-routes'
import fastifyCookie from '@fastify/cookie'
import { userRoutes } from './http/routes/user-routes'

export const app = fastify({
  logger: process.env.NODE_ENV !== 'test',
})

app.register(fastifyCookie)

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '86400',
  },
})

app.get('/', () => {
  return { message: 'Video API is running' }
})

app.get('/health', async () => {
  return { status: 'ok' }
})

app.register(videoRoutes, { prefix: '/api/v1' })
app.register(sessionsRoutes, { prefix: '/api/v1' })
app.register(userRoutes, { prefix: '/api/v1' })

app.setErrorHandler((error: FastifyError, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.issues,
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send({ message: error.message })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
