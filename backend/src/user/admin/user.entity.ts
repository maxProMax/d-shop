import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from '../type';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.admin })
  type: Role;

  @Column({ unique: true })
  @IsEmail()
  email: string;
}
