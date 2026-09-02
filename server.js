import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.get('/', () => {
  return 'Index page'
})

server.get('/health', () => {
  return { status: 'ok' }
})

server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  const video = database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send(video)
})

server.get('/videos', (request, reply) => {
  const search = request.query.search

  const videos = database.list(search)

  return reply.status(200).send(videos)
})

server.put('/videos/:id', (request, reply) => {
  const { id } = request.params
  const { title, description, duration } = request.body

  database.update(id, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const { id } = request.params

  database.delete(id)

  return reply.status(204).send()
})

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
