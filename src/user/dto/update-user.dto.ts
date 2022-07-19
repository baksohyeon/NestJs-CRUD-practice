import { IsEmail, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateUserDto {
  @IsString()
  expectedName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
