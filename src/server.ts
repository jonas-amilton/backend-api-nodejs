import 'dotenv/config'
import { app } from './app'

const port = Number(process.env.PORT || 3333)

async function bootstrap() {
  try {
    const address = await app.listen({
      port,
      host: '0.0.0.0',
    })

    console.log(`Server listening at ${address}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
