import { ErrorType } from "@/types/error";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = ErrorType.UNAUTHORIZED;
  }
}
