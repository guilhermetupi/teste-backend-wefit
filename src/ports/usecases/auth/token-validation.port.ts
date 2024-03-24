import { InternalServerError, UnauthorizedError } from "@/domain/errors";

export namespace TokenValidationUseCasePort {
  export type Param = string;

  export type Response = void | InternalServerError | UnauthorizedError;
}

export abstract class TokenValidationUseCasePort {
  abstract execute(
    token: TokenValidationUseCasePort.Param
  ): TokenValidationUseCasePort.Response;
}
