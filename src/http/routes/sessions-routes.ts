import { FastifyInstance } from 'fastify'
import { SessionsController } from '../controllers/sessions-controller'

const sessionsController = new SessionsController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', (req, rep) => sessionsController.authenticate(req, rep))
  app.patch('/token/refresh', (req, rep) => sessionsController.refresh(req, rep))
  app.delete('/sessions', (req, rep) => sessionsController.logout(req, rep))
}
