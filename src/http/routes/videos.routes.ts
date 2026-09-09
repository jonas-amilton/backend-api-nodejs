import { FastifyInstance } from 'fastify'
import { VideosController } from '../controllers/videos-controller'

const videosController = new VideosController()

export async function videoRoutes(app: FastifyInstance) {
  app.post('/videos', videosController.create)
  app.get('/videos', videosController.list)
  app.put('/videos/:id', videosController.update)
  app.delete('/videos/:id', videosController.delete)
}
