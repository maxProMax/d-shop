import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Price } from './price/price.entity';
import { OrderDetails } from '@/checkout/order/order-details.entry';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  url: string;

  @ManyToMany(() => Price, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  prices: Price[];

  @OneToMany(() => OrderDetails, (det) => det.product)
  orderDetails: OrderDetails[];
}
