import { InvalidParamError } from "../errors";

export class Phone {
  private constructor(private readonly phone: string) {
    Object.freeze(this);
  }

  static create(phone: string): Phone | InvalidParamError {
    const phoneIsValid = Phone.validate(phone);

    if (!phoneIsValid) {
      return phoneIsValid;
    }

    return new Phone(phone);
  }

  static validate(phone: string): true | InvalidParamError {
    const phoneIsUndefined = !phone || phone.trim() === "";

    if (phoneIsUndefined) {
      return new InvalidParamError("Phone is required");
    }

    const phoneIsValidMobilePhoneNumber =
      /^(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})$/.test(phone);
    const phoneIsValidLandlinePhoneNumber =
      /^(\(?\d{2}\)?\s)?(\d{4}\-\d{4})$/.test(phone);

    if (!phoneIsValidMobilePhoneNumber || !phoneIsValidLandlinePhoneNumber) {
      return new InvalidParamError("Phone is invalid");
    }

    return true;
  }

  get value(): string {
    return this.phone;
  }
}
