import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  // ManyToOne,
  OneToMany,
  // OneToOne,
  // JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Site } from '@/site/site.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';

@Entity()
// @Tree('materialized-path')
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToMany(() => Product, {
    cascade: true,
  })
  @JoinTable()
  products: Product[];

  // // @JoinTable()
  // @OneToOne(() => Category, { cascade: true })
  // @JoinColumn()
  // parent: Category;

  // @ManyToOne(() => Category, (category) => category.children)
  // parent: Category;

  // @OneToMany(() => Category, (category) => category.parent)
  // children: Category[];

  @TreeChildren()
  children: Category[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Category;

  @OneToMany(() => Site, (site) => site.navigation)
  site: Site;
}
