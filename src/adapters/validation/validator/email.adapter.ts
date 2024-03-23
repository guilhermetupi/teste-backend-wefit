import { EmailValidationPort } from '@/ports/validations';
import validator from 'validator';

export class EmailValidatorValidationAdapter implements EmailValidationPort {
  validate(email: string): boolean {
    return validator.isEmail(email);
  }
}