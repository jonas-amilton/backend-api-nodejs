import { VideosController } from '../controllers/videos-controller.js'

const videosController = new VideosController()

export async function videoRoutes(app) {
  app.post('/', videosController.create)
  app.get('/', videosController.list)
  app.put('/:id', videosController.update)
  app.delete('/:id', videosController.delete)
}
