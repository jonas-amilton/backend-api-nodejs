import { PrismaVideosRepository } from '../repositories/prisma-videos-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateVideoUseCase } from '../use-cases/create-video'
import { UpdateVideoUseCase } from '../use-cases/update-video'
import { DeleteVideoUseCase } from '../use-cases/delete-video'
// TODO: criar // import { ListVideosUseCase } from '../use-cases/list-videos'

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
  private videosRepository

  constructor() {
    this.videosRepository = new PrismaVideosRepository()
  }

  async create(
    request: FastifyRequest<{ Body: VideoBody }>,
    reply: FastifyReply,
  ) {
    const { title, description, duration } = request.body
    const createVideoUseCase = new CreateVideoUseCase(this.videosRepository)

    await createVideoUseCase.execute({
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
    // TODO: refatorar com usecase
    const videos = await videosRepository.list(search)

    return reply.status(200).send(videos)
  }

  async update(
    request: FastifyRequest<{ Params: VideoParams; Body: VideoBody }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const { title, description, duration } = request.body
    const updateVideoUseCase = new UpdateVideoUseCase(this.videosRepository)

    await updateVideoUseCase.execute(id, {
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
    const deleteVideoUseCase = new DeleteVideoUseCase(this.videosRepository)

    await deleteVideoUseCase.execute(id)

    return reply.status(204).send()
  }
}
