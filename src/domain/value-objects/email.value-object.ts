import { InvalidParamError } from "../errors";

export class Email {
  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  static create(email: string): Email | InvalidParamError {
    const emailIsValid = Email.validate(email);

    if (!emailIsValid) {
      return emailIsValid;
    }

    return new Email(email);
  }

  static validate(email: string): true | InvalidParamError {
    return true;
  }

  get value(): string {
    return this.email;
  }
}
