import { fastify } from 'fastify'
import { baseRoutes } from './routes/base.routes.js'
import { videoRoutes } from './routes/videos.routes.js'

const server = fastify()

server.register(baseRoutes)
server.register(videoRoutes, { prefix: '/videos' })

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
