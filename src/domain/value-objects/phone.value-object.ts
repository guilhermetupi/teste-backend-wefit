import { InvalidParamError } from "../errors";

export class Phone {
  private constructor(private readonly phone: string) {
    Object.freeze(this);
  }

  static create(phone: string, isMobile = true): Phone | InvalidParamError {
    const phoneIsValid = Phone.validate(phone, isMobile);

    if (phoneIsValid instanceof Error) {
      return phoneIsValid;
    }

    return new Phone(phone);
  }

  static validate(phone: string, isMobile: boolean): true | InvalidParamError {
    const phoneIsUndefined = !phone || phone.trim() === "";

    if (phoneIsUndefined) {
      return new InvalidParamError("Telefone é obrigatório.");
    }
    const phoneLength = isMobile ? 11 : 10;
    const phoneIsValid = phone.replace(/\D/g, "").length === phoneLength;

    if (!phoneIsValid) {
      return new InvalidParamError(
        isMobile
          ? "Número de celular inválido."
          : "Número de telefone fixo inválido."
      );
    }

    return true;
  }

  get value(): string {
    return this.phone;
  }
}
