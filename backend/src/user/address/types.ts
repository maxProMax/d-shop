import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsEmail()
  email: string;
}
