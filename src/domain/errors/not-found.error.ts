import { ErrorType } from "@/types/error";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.NOT_FOUND;
  }
}
