import { Connection } from 'typeorm'
import * as faker from 'faker'
import { User, Post } from '../entities'

const users: User[] = []

export const createUsers = async (connection: Connection) => {
  for (const interator of Array.from({ length: 10 })) {
    const user: Partial<User> = new User()
    user.name = faker.name.findName()
    user.email = faker.internet.email()
    user.password = faker.internet.password()
    user.isActive = faker.random.arrayElement([ true, false ])
    user.birthDate = faker.date.past()

    users.push(await connection.manager.save(user) as User)
  }
}

export const createPosts = async (connection: Connection) => {
  for (const user of users) {
    const post1 = new Post()
    const post2 = new Post()

    post1.body = faker.lorem.paragraph()
    post1.user = user
    post2.body = faker.lorem.paragraph()
    post2.user = user

    await connection.manager.save(post1)
    await connection.manager.save(post2)
  }
}