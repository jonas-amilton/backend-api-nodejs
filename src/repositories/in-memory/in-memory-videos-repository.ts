import { randomUUID } from 'node:crypto'
import { VideosRepository } from '../interface/videos-repository'
import { Video } from '../../domain/entities/video'
import { CreateVideoDTO } from '../../dtos/create-video-dto'
import { UpdateVideoDTO } from '../../dtos/update-video-dto'

export class InMemoryVideosRepository implements VideosRepository {
  public items: Video[] = []

  async create(data: CreateVideoDTO): Promise<void> {
    const video: Video = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      duration: data.duration,
      createdAt: new Date(),
    }

    this.items.push(video)
  }

  async findByTitle(title: string): Promise<Video | null> {
    const video = this.items.find((i) => i.title === title)

    return video ?? null
  }

  async list(search?: string): Promise<Video[]> {
    if (search) {
      return this.items.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return this.items
  }

  async update(id: string, data: UpdateVideoDTO): Promise<void> {
    //
  }

  async delete(id: string): Promise<void> {
    //
  }
}
