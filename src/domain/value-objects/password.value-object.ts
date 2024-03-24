import { InvalidParamError } from "../errors";

export class Password {
  private constructor(private readonly password: string) {
    Object.freeze(this);
  }

  static create(
    password: string,
    requiresValidation = true
  ): Password | InvalidParamError {
    if (requiresValidation) {
      const passwordIsValid = Password.validate(password);

      if (!passwordIsValid) {
        return passwordIsValid;
      }
    }

    return new Password(password);
  }

  static validate(password: string): true | InvalidParamError {
    const passwordIsUndefined = !password || password.trim() === "";

    if (passwordIsUndefined) {
      return new InvalidParamError("Password is required");
    }

    const passwordIsValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:]).{8,20}$/.test(
        password
      );

    if (!passwordIsValid) {
      return new InvalidParamError("Password is invalid");
    }

    return true;
  }

  get value(): string {
    return this.password;
  }
}
