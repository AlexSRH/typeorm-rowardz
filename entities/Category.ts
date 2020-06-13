import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TimestampsProps } from './TimestampsProps'
import { CategoryPost } from './CategoryPost'

// enum CategoryLabels {
//   coffe = 'coffe',
//   snacks = 'snacks',
//   time = 'time',
//   programming = 'programming'
// }

@Entity({ name: 'categories' })
export class Category extends TimestampsProps {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @OneToMany(() => CategoryPost, (categoryPost: CategoryPost) => categoryPost.category)
  categoryPosts: CategoryPost[]

  // this one just work in postgres
  // @Column({
  //   type: 'enum',
  //   enum: CategoryLabels,
  //   default: CategoryLabels.programming
  // })
  // label: CategoryLabels
}