import { ErrorType } from "@/domain/types/error";

export class InvalidParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.INVALID_PARAM;
  }
}
