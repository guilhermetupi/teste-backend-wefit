import { InvalidParamError } from "../errors";

export class Document {
  private constructor(private readonly document: string | undefined) {
    Object.freeze(this);
  }

  static create({
    document,
    required = true,
    isCpf = true,
  }: {
    document: string | undefined;
    required?: boolean;
    isCpf?: boolean;
  }): Document | undefined | InvalidParamError {
    const documentIsValid = Document.validate({
      document,
      required,
      isCpf,
    });

    if (documentIsValid instanceof Error) {
      return documentIsValid;
    }

    return new Document(document?.replace(/\D/g, ""));
  }

  static validate({
    document,
    required = true,
    isCpf = true,
  }: {
    document: string | undefined;
    required?: boolean;
    isCpf?: boolean;
  }): void | InvalidParamError | undefined {
    const documentIsNotProvided = !document || document.trim() === "";

    if (required && documentIsNotProvided) {
      return new InvalidParamError(`${isCpf ? "CPF" : "CNPJ"} é obrigatório.`);
    }

    if (documentIsNotProvided) {
      return undefined;
    }

    const documentLength = isCpf ? 11 : 14;
    const documentIsValid =
      document.replace(/\D/g, "").length === documentLength;

    if (!documentIsValid) {
      return new InvalidParamError(`${isCpf ? "CPF" : "CNPJ"} inválido.`);
    }
  }

  get value(): string | undefined {
    return this.document;
  }
}
