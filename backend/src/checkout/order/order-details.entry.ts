import { Product } from '@/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { Currency } from '@/currency/currency.entity';

export enum OrderStatus {
  PAID = 'paid',
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
}

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, { nullable: null })
  order: Order;

  @ManyToMany(() => Product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  product: Product[];

  @ManyToOne(() => Currency, (currency) => currency.orderDetails)
  currency: Currency;

  // @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.IN_PROGRESS })
  // status: string;
}
