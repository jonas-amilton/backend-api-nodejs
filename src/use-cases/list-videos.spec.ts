import { describe, it, expect, beforeEach } from 'vitest'
import { ListVideosUseCase } from './list-videos'
import { InMemoryVideosRepository } from '../repositories/in-memory/in-memory-videos-repository'

describe('Update Video Use Case', () => {
  let inMemoryVideosRepository: InMemoryVideosRepository
  let sut: ListVideosUseCase

  beforeEach(() => {
    inMemoryVideosRepository = new InMemoryVideosRepository()
    sut = new ListVideosUseCase(inMemoryVideosRepository)
  })

  it('should be able to list all videos', async () => {
    await inMemoryVideosRepository.create({
      title: 'JavaScript Video',
      description: 'Vídeo sobre JS',
      duration: 100,
    })

    await inMemoryVideosRepository.create({
      title: 'TypeScript Video',
      description: 'Vídeo sobre TS',
      duration: 120,
    })

    const videos = await sut.execute()

    expect(videos).toHaveLength(2)
  })

  it('should be able to filter videos by search term', async () => {
    await inMemoryVideosRepository.create({
      title: 'Node.js Course',
      description: 'Vídeo sobre backend',
      duration: 180,
    })

    await inMemoryVideosRepository.create({
      title: 'React Course',
      description: 'Vídeo sobre frontend',
      duration: 150,
    })

    const videos = await sut.execute('Node.js')

    expect(videos).toHaveLength(1)
    expect(videos[0]).toEqual(
      expect.objectContaining({ title: 'Node.js Course' }),
    )
  })
})
