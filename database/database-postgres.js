import sql from './db.js'
import { randomUUID } from 'node:crypto'

export class DatabasePostgres {
  // crud methods
  async create(video) {
    const videoId = randomUUID()
    const { title, description, duration } = video

    await sql`
    insert into videos
    (id, title, description, duration)
    values
    (${videoId}, ${title}, ${description}, ${duration})
    `
  }

  async list(search) {
    let videos

    if (search) {
      videos = await sql`
      select * from videos
      where title ilike ${'%' + search + '%'}
      `
    } else {
      videos = await sql`
      select * from videos
      `
    }

    return videos
  }

  async update(id, video) {
    const { title, description, duration } = video

    await sql`
    update videos 
    set title = ${title}, description = ${description}, duration = ${duration}
    where id = ${id}
    `
  }

  async delete(id) {
    await sql`
    delete from videos
    where id = ${id}
    `
  }
}
