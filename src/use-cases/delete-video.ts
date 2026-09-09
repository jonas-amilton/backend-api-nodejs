import { VideosRepository } from '../repositories/interface/videos-repository'

export class DeleteVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(id: string): Promise<void> {
    const video = await this.videosRepository.findById(id)

    if (!video) {
      throw new Error('Resource not found')
    }

    await this.videosRepository.delete(id)
  }
}
