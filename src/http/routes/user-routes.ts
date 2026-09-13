import { FastifyInstance } from 'fastify'
import { ProfileController } from '../controllers/profile-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

const profileController = new ProfileController()

export async function userRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJwt] }, (req, rep) => profileController.profile(req, rep))
}
