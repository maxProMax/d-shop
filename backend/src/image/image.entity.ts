import { Site } from '@/site/site.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  // JoinColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';

// {
//   fieldname: 'logo',
//   originalname: 'png-clipart-web-development-logo-website-web-design-symmetry.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: './uploads/site',
//   filename: 'b01d6a724ef1abdd46994de18a8e3cf1',
//   path: 'uploads/site/b01d6a724ef1abdd46994de18a8e3cf1',
//   size: 19895
// }

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  originalPath: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @OneToOne(() => Site, (s) => s.logo, {
    onDelete: 'CASCADE',
  })
  site: Site;

  // @ManyToMany(() => Category)
  // @JoinTable()
  // categories: Category[];
}
