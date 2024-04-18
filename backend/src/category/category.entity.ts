import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, {
    cascade: true,
  })
  @JoinTable()
  products: Product[];

  // // @JoinTable()
  // @OneToOne(() => Category, { cascade: true })
  // @JoinColumn()
  // parent: Category;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
