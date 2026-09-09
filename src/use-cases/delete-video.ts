import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { VideosRepository } from '../repositories/interface/videos-repository'

export class DeleteVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(id: string): Promise<void> {
    const video = await this.videosRepository.findById(id)

    if (!video) {
      throw new ResourceNotFoundError()
    }

    await this.videosRepository.delete(id)
  }
}
