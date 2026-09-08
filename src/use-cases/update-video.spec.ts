import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateVideoUseCase } from './update-video'
import { InMemoryVideosRepository } from '../repositories/in-memory/in-memory-videos-repository'

describe('Update Video Use Case', () => {
  let inMemoryVideosRepository: InMemoryVideosRepository
  let sut: UpdateVideoUseCase

  beforeEach(() => {
    inMemoryVideosRepository = new InMemoryVideosRepository()
    sut = new UpdateVideoUseCase(inMemoryVideosRepository)
  })

  it('should be able to update a video', async () => {
    await inMemoryVideosRepository.create({
      title: 'Título Original',
      description: 'Descrição Original',
      duration: 120,
    })

    const createdVideo = inMemoryVideosRepository.items[0]

    await sut.execute(createdVideo.id, {
      title: 'Título Atualizado',
      description: 'Descrição Atualizada',
      duration: 150,
    })

    expect(inMemoryVideosRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'Título Atualizado',
        duration: 150,
      }),
    )
  })

  it('should not be able to update a non-existing video', async () => {
    await expect(() =>
      sut.execute('id-inexistente', {
        title: 'Novo Título',
      }),
    ).rejects.toThrow()
  })
})
