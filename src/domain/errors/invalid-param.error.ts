import { ErrorType } from "@/types/error";

export class InvalidParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.INVALID_PARAM;
  }
}
