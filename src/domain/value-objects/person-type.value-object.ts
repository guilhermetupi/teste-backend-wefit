import { InvalidParamError } from "../errors";
import { PersonTypeEnum } from "@/types/entities";

export class PersonType {
  private constructor(private readonly personType: PersonTypeEnum) {
    Object.freeze(this);
  }

  static create(personType: string): PersonType | InvalidParamError {
    const personTypeIsValid = PersonType.isValid(personType);

    if (!personTypeIsValid) {
      return new InvalidParamError("Invalid person type");
    }
    return new PersonType(personType as PersonTypeEnum);
  }

  static isValid(personType: string): boolean {
    return Object.values(PersonTypeEnum).includes(personType as PersonTypeEnum);
  }

  get value(): PersonTypeEnum {
    return this.personType;
  }
}
