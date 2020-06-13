import { Connection, Repository } from 'typeorm'
import { User } from '../entities'
import { writeFileSync } from 'fs'

export const readUsers = async (connection: Connection) => {
  const userRepository: Repository<User> = connection.getRepository(User)
  const data = await userRepository.find({
    order: { birthDate: 'ASC' },
    relations: ['posts']
  })
  
  writeFileSync('data.json', JSON.stringify(data, null, 2))
}