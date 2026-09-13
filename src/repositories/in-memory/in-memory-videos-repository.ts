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

  async findById(id: string): Promise<Video | null> {
    const video = this.items.find((i) => i.id === id)

    return video ?? null
  }

  async list(search?: string): Promise<Video[]> {
    if (search) {
      return this.items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    }

    return this.items
  }

  async update(id: string, data: UpdateVideoDTO): Promise<void> {
    const { title, description, duration } = data
    const video = this.items.find((i) => i.id === id)

    if (video) {
      video.title = title ?? ''
      video.description = description ?? ''
      video.duration = duration ?? 0
    }
  }

  async delete(id: string): Promise<void> {
    const indexVideo = this.items.findIndex((i) => i.id === id)

    if (indexVideo === -1) {
      this.items.splice(indexVideo, 1)
    }
  }
}
