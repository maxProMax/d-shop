import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Price } from './price/price.entity';
import { OrderDetails } from '@/checkout/order/order-details.entry';
import { Image } from '@/image/image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  url: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToMany(() => Price, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  prices: Price[];

  @OneToMany(() => OrderDetails, (det) => det.product)
  orderDetails: OrderDetails[];

  @OneToOne(() => Image, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  image: Image;
}
