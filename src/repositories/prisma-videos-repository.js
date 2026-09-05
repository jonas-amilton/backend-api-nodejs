import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

export class PrismaVideosRepository {
  async create(video) {
    const { title, description, duration } = video
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

  async list(search) {
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

  async update(id, video) {
    const { title, description, duration } = video

    await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        duration: Number(duration),
      },
    })
  }

  async delete(id) {
    await prisma.video.delete({
      where: { id },
    })
  }
}
