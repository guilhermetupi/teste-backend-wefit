import { ErrorType } from "@/domain/types/error";

export class InternalServerError extends Error {
  constructor() {
    super("Internal Server Error");
    this.name = ErrorType.INTERNAL_SERVER;
  }
}
