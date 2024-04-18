import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @ManyToMany(() => Category)
  // @JoinTable()
  // categories: Category[];
}
