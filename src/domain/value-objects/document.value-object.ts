import { InvalidParamError } from "../errors";

export class Document {
  private constructor(private readonly document: string) {
    Object.freeze(this);
  }

  static create(
    document: string,
    required = true
  ): Document | undefined | InvalidParamError {
    const documentIsValid = Document.validate(document, required);

    if (!documentIsValid) {
      return documentIsValid;
    }

    return new Document(document);
  }

  static validate(
    document: string,
    required: boolean
  ): true | InvalidParamError | undefined {
    const documentIsNotProvided = !document || document.trim() === "";

    if (required && documentIsNotProvided) {
      return new InvalidParamError("Document is required.");
    }

    if (documentIsNotProvided) {
      return undefined;
    }

    const documentIsValidCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(document);
    const documentIsValidCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(
      document
    );

    if (!documentIsValidCpf || !documentIsValidCnpj) {
      return new InvalidParamError("Invalid document.");
    }

    return true;
  }

  get value(): string {
    return this.document;
  }
}
