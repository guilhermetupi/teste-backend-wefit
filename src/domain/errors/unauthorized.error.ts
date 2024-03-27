import { ErrorType } from "@/types/error";

export class UnauthorizedError extends Error {
  constructor() {
    super("Usuário não autorizado.");
    this.name = ErrorType.UNAUTHORIZED;
  }
}
