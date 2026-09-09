import { VideosRepository } from '../repositories/interface/videos-repository'
import { UpdateVideoDTO } from '../dtos/update-video-dto'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(id: string, data: UpdateVideoDTO): Promise<void> {
    const { title, description, duration } = data
    const video = await this.videosRepository.findById(id)

    if (!video) {
      throw new ResourceNotFoundError()
    }

    await this.videosRepository.update(id, {
      title,
      description,
      duration,
    })
  }
}
