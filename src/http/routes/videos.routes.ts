import { FastifyInstance } from 'fastify'
import { VideosController } from '../controllers/videos-controller'
import { verifyJwt } from '../../http/middlewares/verify-jwt'

const videosController = new VideosController()

export async function videoRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/videos', videosController.create)
  app.get('/videos', videosController.list)
  app.put('/videos/:id', videosController.update)
  app.delete('/videos/:id', videosController.delete)
}
