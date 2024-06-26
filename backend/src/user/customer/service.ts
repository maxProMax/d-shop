import {
  Injectable,
  // Inject,
  // Request,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CartService } from '@/cart/cart.service';
import { Role } from '../type';
import { User } from './user.entity';
import { UserDto } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly cartService: CartService,
  ) {}

  async create({
    firstName,
    lastName,
    username,
    password,
  }: UserDto): Promise<any> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.password = hashedPassword;
    user.type = Role.user;

    const { id } = await this.usersRepository.save(user);

    return id;
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async loginGuest(id: string): Promise<any> {
    await this.cartService.createGuestCart(id);
    return { guest: true };
  }

  async registration(body: UserDto): Promise<any> {
    const user = await this.create(body);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loginCustomer(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async validate(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    const passwordValid = await bcrypt.compare(pass, user.password);

    if (passwordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }
}
