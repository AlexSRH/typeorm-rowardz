import { Connection, Repository } from 'typeorm'
import * as faker from 'faker'
import { User, Post, Category, CategoryPost } from '../entities'
import { random } from 'faker'

const users: User[] = []
const posts: Post[] = []

export const createUsers = async (connection: Connection) => {
  for (const _ of Array.from({ length: 10 })) {
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
    const post1: Partial<Post> = new Post()
    const post2: Partial<Post> = new Post()

    post1.body = faker.lorem.paragraph()
    post1.user = user

    post2.body = faker.lorem.paragraph()
    post2.user = user

    posts.push(await connection.manager.save(post1) as Post)
    posts.push(await connection.manager.save(post2) as Post)
  }
}

export const createCategories = async (connection: Connection) => {
  const categoryRepository: Repository<Category> = connection.getRepository(Category)

  for (const _ of Array.from({ length: 10 })) {
    const category: Partial<Category> = new Category()
    category.label = faker.hacker.verb(),
    
    await categoryRepository.save(category)
  }
}

export const createManyToMany = async (connection: Connection) => {
  const categoryRepository: Repository<Category> = connection.getRepository(Category)
  const categoryPostRepository: Repository<CategoryPost> = 
    connection.getRepository(CategoryPost)

  const categories: Category[] = await categoryRepository.find()

  for (const post of posts) {
    const categoryPost: Partial<CategoryPost> = new CategoryPost()

    categoryPost.someColumn = faker.hacker.adjective()
    categoryPost.post = post
    categoryPost.category = random.arrayElement(categories)

    await categoryPostRepository.save(categoryPost)
  }
}