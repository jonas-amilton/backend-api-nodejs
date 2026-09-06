import { Video } from '../../domain/entities/video'
import { CreateVideoDTO } from '../../dtos/create-video-dto'
import { UpdateVideoDTO } from '../../dtos/update-video-dto'

export interface VideosRepository {
  create(data: CreateVideoDTO): Promise<void>
  findByTitle(title: string): Promise<Video | null>
  list(search?: string): Promise<Video[]>
  update(id: string, data: UpdateVideoDTO): Promise<void>
  delete(id: string): Promise<void>
}
