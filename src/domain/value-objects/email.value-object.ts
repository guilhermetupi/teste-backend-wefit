import { InvalidParamError } from "../errors";

export class Email {
  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  static create(email: string): Email | InvalidParamError {
    const emailIsValid = Email.validate(email);

    if (emailIsValid instanceof Error) {
      return emailIsValid;
    }

    return new Email(email);
  }

  static validate(email: string): InvalidParamError | void {
    const emailIsUndefined = !email || email.trim() === "";

    if (emailIsUndefined) {
      return new InvalidParamError("Email é obrigatório.");
    }

    const emailIsValid =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

    if (!emailIsValid) {
      return new InvalidParamError("Email inválido.");
    }
  }

  get value(): string {
    return this.email;
  }
}
