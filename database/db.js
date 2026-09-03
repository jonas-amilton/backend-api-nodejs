import 'dotenv/config'
import postgres from 'postgres'

const isProduction = process.env.NODE_ENV === 'production'

const sql = postgres(process.env.DATABASE_URL, {
  ssl: isProduction ? 'require' : false,
})

export default sql
