import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { TimestampsProps } from './TimestampsProps'
import { User } from './User'
import { CategoryPost } from './CategoryPost'

@Entity({ name: 'posts' })
export class Post extends TimestampsProps {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: false })
  body: string

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => CategoryPost, (categoryPosts: CategoryPost) => categoryPosts.category)
  categoryPosts: CategoryPost[]
}