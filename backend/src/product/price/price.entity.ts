import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,

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
import { Currency } from '@/currency/currency.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // currency: string;

  // @OneToOne(() => Currency, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn()
  // currency: Currency;

  @ManyToOne(() => Currency, (currency) => currency.prices)
  currency: Currency;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', nullable: true })
  discountPrice: number;

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
}
