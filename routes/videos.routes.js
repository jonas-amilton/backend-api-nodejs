import { DatabasePostgres } from '../database/database-postgres.js'

const database = new DatabasePostgres()

export async function videoRoutes(app) {
  app.post('/', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
      title,
      description,
      duration,
    })

    return reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
    const search = request.query.search

    const videos = await database.list(search)

    return reply.status(200).send(videos)
  })

  app.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { title, description, duration } = request.body

    await database.update(id, {
      title,
      description,
      duration,
    })

    return reply.status(204).send()
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = request.params

    await database.delete(id)

    return reply.status(204).send()
  })
}
