import { ErrorType } from "@/domain/types/error";

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.CONFLICT;
  }
}
