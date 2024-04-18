import { IsString, IsEmail } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;
}
