import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { AuthResponse } from "@/types/auth";

export namespace TokenValidationUseCasePort {
  export type Param = string;

  export type Response =
    | {
        tokens?: AuthResponse;
        payload: Record<string, any>;
      }
    | InternalServerError
    | UnauthorizedError;
}

export abstract class TokenValidationUseCasePort {
  abstract execute(
    token: TokenValidationUseCasePort.Param
  ): TokenValidationUseCasePort.Response;
}
