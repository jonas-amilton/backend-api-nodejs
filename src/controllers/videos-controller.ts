import { PrismaVideosRepository } from '../repositories/prisma-videos-repository'
import { FastifyRequest, FastifyReply } from 'fastify'

interface VideoBody {
  title: string
  description: string
  duration: number
}

interface VideoParams {
  id: string
}

interface VideoQuery {
  search?: string
}

const videosRepository = new PrismaVideosRepository()

export class VideosController {
  async create(
    request: FastifyRequest<{ Body: VideoBody }>,
    reply: FastifyReply,
  ) {
    const { title, description, duration } = request.body

    await videosRepository.create({
      title,
      description,
      duration,
    })

    return reply.status(201).send()
  }

  async list(
    request: FastifyRequest<{ Querystring: VideoQuery }>,
    reply: FastifyReply,
  ) {
    const { search } = request.query

    const videos = await videosRepository.list(search)

    return reply.status(200).send(videos)
  }

  async update(
    request: FastifyRequest<{ Params: VideoParams; Body: VideoBody }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const { title, description, duration } = request.body

    await videosRepository.update(id, {
      title,
      description,
      duration,
    })

    return reply.status(204).send()
  }

  async delete(
    request: FastifyRequest<{ Params: VideoParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    await videosRepository.delete(id)

    return reply.status(204).send()
  }
}
