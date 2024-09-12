// src/auth/validators/is-password-match.validator.ts
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { RegisterDto } from '../dto/register.dto'; // Pastikan path sesuai

@ValidatorConstraint({ name: 'isPasswordMatch', async: false })
export class IsPasswordMatch implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const { password } = args.object as RegisterDto;
    return password === confirmPassword;
  }

  defaultMessage(): string {
    return 'Password dan konfirmasi password harus cocok';
  }
}
