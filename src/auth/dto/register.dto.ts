import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  Length
} from 'class-validator';

// DTO untuk validasi registrasi
export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 50, { message: 'Username must be at least 3 characters long' }) // Validasi panjang username
  username!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @MinLength(6, { message: 'Confirm Password must be at least 6 characters long' })
  confirmPassword!: string;
}
