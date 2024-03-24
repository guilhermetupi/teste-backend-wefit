import { ErrorType } from "@/types/error";

export class InternalServerError extends Error {
  constructor() {
    super("Internal Server Error");
    this.name = ErrorType.INTERNAL_SERVER;
  }
}
