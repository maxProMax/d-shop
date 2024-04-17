import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

export class UserUpdateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UserLoginDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
