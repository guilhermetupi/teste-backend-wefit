import { CnpjValidationPort, CpfValidationPort } from "@/ports/validations";
import { InvalidParamError } from "../errors";

export class Document {
  private constructor(private readonly document: string) {
    Object.freeze(this);
  }

  static create(
    document: string,
    documentValidator: CpfValidationPort | CnpjValidationPort,
    required = true
  ): Document | undefined | InvalidParamError {
    const documentIsValid = Document.validate(
      document,
      documentValidator,
      required
    );

    if (!documentIsValid) {
      return documentIsValid;
    }

    return new Document(document);
  }

  static validate(
    document: string,
    documentValidator: CpfValidationPort | CnpjValidationPort,
    required: boolean
  ): true | InvalidParamError | undefined {
    const documentIsNotProvided = !document || document.trim() === "";

    if (required && documentIsNotProvided) {
      return new InvalidParamError("Document is required.");
    }

    if (documentIsNotProvided) {
      return undefined;
    }

    const documentIsValid = documentValidator.validate(document);

    if (!documentIsValid) {
      return new InvalidParamError("Invalid document.");
    }

    return true;
  }

  get value(): string {
    return this.document;
  }
}
