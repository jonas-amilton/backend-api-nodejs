import { FastifyInstance } from 'fastify'
import { SessionsController } from '../controllers/sessions-controller'

const sessionsController = new SessionsController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', (request, reply) =>
    sessionsController.authenticate(request, reply),
  )
}
