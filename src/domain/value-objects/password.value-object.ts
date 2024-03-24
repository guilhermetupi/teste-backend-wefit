import { InvalidParamError } from "../errors";

export class Password {
  private constructor(private readonly password: string) {
    Object.freeze(this);
  }

  static create(password: string): Password | InvalidParamError {
    const passwordIsValid = Password.validate(password);

    if (!passwordIsValid) {
      return passwordIsValid;
    }

    return new Password(password);
  }

  static validate(password: string): true | InvalidParamError {
    return true;
  }

  get value(): string {
    return this.password;
  }
}
