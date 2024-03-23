import { PasswordValidationPort } from "@/ports/validations";
import validator from 'validator';

export class PasswordValidatorValidationAdapter implements PasswordValidationPort {
  validate(password: string): boolean {
    return validator.isStrongPassword(password);
  }
}