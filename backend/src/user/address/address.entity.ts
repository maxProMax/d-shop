import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  // ManyToOne,

  // ManyToOne,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
import { Order } from '@/checkout/order/order.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
