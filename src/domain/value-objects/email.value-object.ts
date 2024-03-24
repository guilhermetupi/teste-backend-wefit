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
    const emailIsUndefined = !email || email.trim() === "";

    if (emailIsUndefined) {
      return new InvalidParamError("Email is required");
    }

    const emailIsValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

    if (!emailIsValid) {
      return new InvalidParamError("Email is invalid");
    }

    return true;
  }

  get value(): string {
    return this.email;
  }
}
