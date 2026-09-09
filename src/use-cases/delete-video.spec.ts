import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteVideoUseCase } from './delete-video'
import { InMemoryVideosRepository } from '../repositories/in-memory/in-memory-videos-repository'

describe('Delete Video Use Case', () => {
  let inMemoryVideosRepository: InMemoryVideosRepository
  let sut: DeleteVideoUseCase

  beforeEach(() => {
    inMemoryVideosRepository = new InMemoryVideosRepository()
    sut = new DeleteVideoUseCase(inMemoryVideosRepository)
  })

  it('should not be able to delete a non-existing video', async () => {
    await expect(() => sut.execute('id-inexistente')).rejects.toThrow()
  })
})
