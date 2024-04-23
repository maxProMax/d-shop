import { Price } from '@/product/price/price.entity';
import { Site } from '@/site/site.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  // OneToOne,
  // JoinColumn,
  // ManyToOne,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';
// import { Image } from '@/image/image.entity';
// import { Category } from '@/category/category.entity';
// import { Product } from '@/product/product.entity';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @OneToMany(() => Site, (site) => site.currency)
  site: Site;

  @OneToMany(() => Price, (price) => price.currency)
  prices: Price[];

  // @OneToOne(() => Image, (img) => img.site, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn()
  // logo: Image;

  // @OneToOne(() => Category, {
  //   cascade: true,
  //   // onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // navigation: Category;

  // @ManyToOne(() => Category, (category) => category.site, {
  //   cascade: true,
  //   onDelete: 'SET NULL',
  // })
  // navigation: Category;

  // @ManyToMany(() => Product)
  // @JoinTable()
  // products: Product[];
}
