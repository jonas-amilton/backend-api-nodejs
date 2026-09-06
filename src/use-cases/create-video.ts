import { VideosRepository } from '../repositories/interface/videos-repository'
import { CreateVideoDTO } from '../dtos/create-video-dto'

export class CreateVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute({
    title,
    description,
    duration,
  }: CreateVideoDTO): Promise<void> {
    const videoAlreadyExists = await this.videosRepository.findByTitle(title)

    if (videoAlreadyExists) {
      throw new Error('Video already exists')
    }

    await this.videosRepository.create({
      title,
      description,
      duration,
    })
  }
}
