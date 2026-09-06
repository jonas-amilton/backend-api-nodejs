import { describe, it, expect, beforeEach } from 'vitest'
import { CreateVideoUseCase } from './create-video'
import { InMemoryVideosRepository } from '../repositories/in-memory/in-memory-videos-repository'

describe('Create Video Use Case', () => {
  let inMemoryVideosRepository: InMemoryVideosRepository
  let sut: CreateVideoUseCase

  beforeEach(() => {
    inMemoryVideosRepository = new InMemoryVideosRepository()
    sut = new CreateVideoUseCase(inMemoryVideosRepository)
  })

  it('should not be able to create duplicate videos', async () => {
    await sut.execute({
      title: 'TypeScript Avançado',
      description: 'Vídeo 1',
      duration: 60,
    })

    await expect(
      sut.execute({
        title: 'TypeScript Avançado',
        description: 'Vídeo duplicado',
        duration: 90,
      }),
    ).rejects.toThrow('Video already exists')
  })
})
