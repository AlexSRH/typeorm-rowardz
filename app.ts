import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import { User, Post, Category, CategoryPost } from './entities'
import { createUsers, createPosts, readUsers, createManyToMany, createCategories } from './crud'

const app = async () => {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: 'db/test_typeorm.sqlite',
    entities: [User, Post, Category, CategoryPost],
    logging: true
  })

  await connection.synchronize(true)
  await createUsers(connection)
  await createPosts(connection)
  await readUsers(connection)
  await createCategories(connection)
  await createManyToMany(connection)
}

app()
