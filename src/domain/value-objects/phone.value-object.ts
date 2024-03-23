import { InvalidParamError } from "../errors";

export class Phone {
  private constructor(private readonly phone: string) {}

  static create(phone: string): Phone | InvalidParamError {
    const phoneIsValid = Phone.validate(phone);

    if (!phoneIsValid) {
      return phoneIsValid;
    }

    return new Phone(phone);
  }

  static validate(phone: string): true | InvalidParamError {
    return true;
  }

  get value(): string {
    return this.phone;
  }
}