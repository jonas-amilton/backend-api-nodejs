import { PrismaVideosRepository } from '../repositories/prisma-videos-repository.js'

const videosRepository = new PrismaVideosRepository()

export class VideosController {
  async create(request, reply) {
    const { title, description, duration } = request.body

    await videosRepository.create({
      title,
      description,
      duration,
    })

    return reply.status(201).send()
  }

  async list(request, reply) {
    const { search } = request.query

    const videos = await videosRepository.list(search)

    return reply.status(200).send(videos)
  }

  async update(request, reply) {
    const { id } = request.params
    const { title, description, duration } = request.body

    await videosRepository.update(id, {
      title,
      description,
      duration,
    })

    return reply.status(204).send()
  }

  async delete(request, reply) {
    const { id } = request.params

    await videosRepository.delete(id)

    return reply.status(204).send()
  }
}
