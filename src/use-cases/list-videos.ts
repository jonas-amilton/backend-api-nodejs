import { Video } from '../domain/entities/video'
import { VideosRepository } from '../repositories/interface/videos-repository'

export class ListVideosUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(search?: string): Promise<Video[]> {
    const videos = await this.videosRepository.list(search)

    return videos
  }
}
