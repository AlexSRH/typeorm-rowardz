import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { TimestampsProps } from './TimestampsProps'
import { Post } from './Post'

@Entity({ name: 'users' })
export class User extends TimestampsProps {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, name: 'is_active' })
  isActive: boolean

  @Column({ nullable: false, name: 'birth_date' })
  birthDate: Date

  @OneToMany(() => Post, (post: Post) => post.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  posts: Post[]
}
