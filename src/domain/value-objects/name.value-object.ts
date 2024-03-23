import { InvalidParamError } from "../errors";

export class Name {
  constructor(private readonly name: string) {
    Object.freeze(this);
  }

  static create(name: string): Name {
    const nameIsValid = Name.isValid(name);

    if (nameIsValid instanceof InvalidParamError) {
      throw nameIsValid;
    }

    return new Name(name);
  }

  static isValid(name: string): true | InvalidParamError {
    const nameIsDefined = !!name;

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
