import { prisma } from '../lib/prisma'
import { randomUUID } from 'node:crypto'
import { VideosRepository } from '../repositories/interface/videos-repository'
import { Video } from '../domain/entities/video'
import { CreateVideoDTO } from '../dtos/create-video-dto'
import { UpdateVideoDTO } from '../dtos/update-video-dto'

export class PrismaVideosRepository implements VideosRepository {
  async create(data: CreateVideoDTO): Promise<void> {
    const { title, description, duration } = data
    const videoId = randomUUID()

    await prisma.video.create({
      data: {
        id: videoId,
        title,
        description,
        duration: Number(duration),
      },
    })
  }

  async findByTitle(title: string): Promise<Video | null> {
    const video = await prisma.video.findUnique({
      where: {
        title,
      },
    })

    return video
  }

  async list(search?: string): Promise<Video[]> {
    return await prisma.video.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async update(id: string, data: UpdateVideoDTO): Promise<void> {
    const { title, description, duration } = data

    await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        duration: Number(duration),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.video.delete({
      where: { id },
    })
  }
}
