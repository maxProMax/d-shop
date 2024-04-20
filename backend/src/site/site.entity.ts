import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';
import { Image } from '@/image/image.entity';
import { Category } from '@/category/category.entity';

@Entity()
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siteName: string;

  @OneToOne(() => Image, (img) => img.site, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  logo: Image;

  // @OneToOne(() => Category, {
  //   cascade: true,
  //   // onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // navigation: Category;

  @ManyToOne(() => Category, (category) => category.site, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  navigation: Category;

  // @ManyToMany(() => Category)
  // @JoinTable()
  // categories: Category[];
}
