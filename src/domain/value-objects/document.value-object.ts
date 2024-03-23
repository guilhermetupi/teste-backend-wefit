import { InvalidParamError } from "../errors";

export class Document {
  private constructor(private readonly document: string) {}

  static create(document: string): Document | InvalidParamError {
    const documentIsValid = Document.validate(document);

    if (!documentIsValid) {
      return documentIsValid;
    }

    return new Document(document);
  }

  static validate(document: string): true | InvalidParamError {
    return true;
  }

  get value(): string {
    return this.document;
  }
}