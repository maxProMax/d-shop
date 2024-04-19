import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';
import { Image } from '@/image/image.entity';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siteName: string;

  @OneToOne(() => Image)
  @JoinColumn()
  logo?: Image;

  // @ManyToMany(() => Category)
  // @JoinTable()
  // categories: Category[];
}
