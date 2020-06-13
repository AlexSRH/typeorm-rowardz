import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { TimestampsProps } from './TimestampsProps'
import { Post } from './Post'
import { Category } from './Category'

@Entity({ name: 'category_posts' })
export class CategoryPost extends TimestampsProps {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'some_column' })
  someColumn: string

  @ManyToOne(() => Post, (post: Post) => post.categoryPosts)
  @JoinColumn({ name: 'post_id' })
  post: Post

  @ManyToOne(() => Category, (category: Category) => category.categoryPosts)
  @JoinColumn({ name: 'category_id' })
  category: Category
}