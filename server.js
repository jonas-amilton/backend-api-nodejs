import 'dotenv/config'
import { fastify } from 'fastify'
import { baseRoutes } from './src/routes/base.routes.js'
import { videoRoutes } from './src/routes/videos.routes.js'

const server = fastify()

server.register(baseRoutes)
server.register(videoRoutes, { prefix: '/videos' })

const port = Number(process.env.PORT || 3333)

server.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
