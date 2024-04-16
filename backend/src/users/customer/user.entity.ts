import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  type: Role.user;
}
