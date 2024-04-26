import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../type';
import { AdminUser } from './user.entity';
import { UserDto, UserUpdateDto } from './types';

const sanitize = (user: AdminUser) => {
  if (!user) {
    return user;
  }
  const { password, ...rest } = user;

  return rest;
};

@Injectable()
export class UsersAdminService {
  constructor(
    @InjectRepository(AdminUser) private usersRepository: Repository<AdminUser>,
  ) {}

  findOneByEmail(email: string): Promise<AdminUser | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<Omit<AdminUser, 'password'> | null> {
    const user = await this.usersRepository.findOneBy({ id });

    return sanitize(user);
  }

  async findAll(): Promise<Omit<AdminUser, 'password'>[]> {
    const users = await this.usersRepository.find();

    return users.map(sanitize);
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

  async update(
    id: number,
    { firstName, lastName }: UserUpdateDto,
  ): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });

    user.firstName = firstName;
    user.lastName = lastName;

    const { id: userId } = await this.usersRepository.save(user);

    return userId;
  }

  async delete(id: number): Promise<any> {
    await this.usersRepository.delete({ id });

    return { deleted: true };
  }

  async login(email: string): Promise<any> {
    const user = await this.findOneByEmail(email);

    return sanitize(user);
  }

  async registration(body: UserDto): Promise<any> {
    const user = await this.create(body);

    return user;
  }

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.findOneByEmail(email);

    const passwordValid = await bcrypt.compare(pass, user?.password || '');

    if (passwordValid) {
      return sanitize(user);
    }

    throw new UnauthorizedException();
  }
}
