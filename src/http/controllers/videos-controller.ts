import { PrismaVideosRepository } from '../../repositories/prisma/prisma-videos-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateVideoUseCase } from '../../use-cases/create-video'
import { UpdateVideoUseCase } from '../../use-cases/update-video'
import { DeleteVideoUseCase } from '../../use-cases/delete-video'
import { ListVideosUseCase } from '../../use-cases/list-videos'
import {
  createVideoBodySchema,
  videoParamsSchema,
  videoQuerySchema,
} from '../schemas/videos-schemas'

export class VideosController {
  private videosRepository

  constructor() {
    this.videosRepository = new PrismaVideosRepository()
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createVideoBodySchema.parse(request.body)
    const { title, description, duration } = data
    const createVideoUseCase = new CreateVideoUseCase(this.videosRepository)

    await createVideoUseCase.execute({
      title,
      description,
      duration,
    })

    return reply.status(201).send()
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const { search } = videoQuerySchema.parse(request.query)
    const listVideosUseCase = new ListVideosUseCase(this.videosRepository)

    const videos = await listVideosUseCase.execute(search)

    return reply.status(200).send(videos)
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = videoParamsSchema.parse(request.params)
    const data = createVideoBodySchema.parse(request.body)
    const { title, description, duration } = data
    const updateVideoUseCase = new UpdateVideoUseCase(this.videosRepository)

    await updateVideoUseCase.execute(id, {
      title,
      description,
      duration,
    })

    return reply.status(204).send()
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = videoParamsSchema.parse(request.params)
    const deleteVideoUseCase = new DeleteVideoUseCase(this.videosRepository)

    await deleteVideoUseCase.execute(id)

    return reply.status(204).send()
  }
}
