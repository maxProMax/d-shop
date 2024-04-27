// import { Price } from '@/product/price/price.entity';
// import { Site } from '@/site/site.entity';
// import { Product } from '@/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToMany,
  CreateDateColumn,
  // OneToOne,CreateDateColumn
  // JoinColumn,
  // ManyToOne,
  // ManyToMany,
  // JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderDetails } from './order-details.entry';
import { Currency } from '@/currency/currency.entity';
import { Role } from '@/user/type';
import { Address } from '@/user/address/address.entity';
// import { Category } from '../category/category.entity';
// import { IsEmail } from 'class-validator';
// import { Role } from '../type';
// import { Image } from '@/image/image.entity';
// import { Category } from '@/category/category.entity';
// import { Product } from '@/product/product.entity';

export enum OrderStatus {
  PAID = 'paid',
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Role, default: Role.guest })
  userType: Role;

  @Column({ nullable: true })
  total: number;

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(() => OrderDetails, (det) => det.order)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Currency, (currency) => currency.orders)
  currency: Currency;

  @ManyToOne(() => Address, (address) => address.orders, { cascade: true })
  address: Address;
}

// @Entity()
// export class OrderDetails {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   orderId: string;

//   @Column({ type: 'int' })
//   qty: number;

//   @Column({ type: 'decimal' })
//   price: number;

//   @ManyToMany(() => Product)
//   @JoinTable()
//   products: Product[];

//   @OneToMany(() => Order, (order) => order.orderDetails)
//   orders: Order[];

//   // @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.IN_PROGRESS })
//   // status: string;
// }
