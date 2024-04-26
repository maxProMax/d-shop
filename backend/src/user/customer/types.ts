import { IsString } from 'class-validator';

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
