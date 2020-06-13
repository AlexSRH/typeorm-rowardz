import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import { User, Post } from './entities'
import { createUsers, createPosts, readUsers } from './crud'

const app = async () => {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: 'db/test_typeorm.sqlite',
    entities: [User, Post]
  })

  await connection.synchronize(true)
  await createUsers(connection)
  await createPosts(connection)
  await readUsers(connection)
}

app()
