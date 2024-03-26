import { InvalidParamError } from "../errors";

export class Name {
  constructor(private readonly name: string) {
    Object.freeze(this);
  }

  static create(name: string): Name | InvalidParamError {
    const nameIsValid = Name.isValid(name);

    if (nameIsValid instanceof InvalidParamError) {
      throw nameIsValid;
    }

    return new Name(name);
  }

  static isValid(name: string): true | InvalidParamError {
    const nameIsDefined = !!name;

    if (!nameIsDefined) {
      return new InvalidParamError("Name is required");
    }

    const nameIsBigEnough = name.length >= 3;

    if (!nameIsBigEnough) {
      return new InvalidParamError("Name is too short");
    }

    return true;
  }

  get value(): string {
    return this.name;
  }
}
