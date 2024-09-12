import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  usernameOrEmail!: string;

  @IsNotEmpty()
  password!: string;
}
