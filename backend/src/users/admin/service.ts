import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../type';
import { AdminUser } from './user.entity';
import { UserDto } from './types';

@Injectable()
export class UsersAdminService {
  constructor(
    @InjectRepository(AdminUser) private usersRepository: Repository<AdminUser>,
  ) {}

  findOne(email: string): Promise<AdminUser | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: UserDto): Promise<any> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = new AdminUser();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    user.type = Role.admin;

    const { id } = await this.usersRepository.save(user);

    return id;
  }

  async login(email: string): Promise<any> {
    const user = await this.findOne(email);

    const { password, ...result } = user;
    return result;
  }

  async registration(body: UserDto): Promise<any> {
    const user = await this.create(body);

    return user;
  }

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.findOne(email);
    const passwordValid = await bcrypt.compare(pass, user.password);

    if (passwordValid) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }
}
