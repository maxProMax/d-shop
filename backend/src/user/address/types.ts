import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class AddressDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsEmail()
  email: string;
}
