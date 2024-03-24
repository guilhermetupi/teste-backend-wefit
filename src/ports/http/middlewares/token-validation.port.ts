import { UnauthorizedError } from "@/domain/errors";

export namespace TokenValidationMiddlewarePort {
  export type Param = string;

  export type Response = string | UnauthorizedError;
}

export abstract class TokenValidationMiddlewarePort {
  abstract execute(
    token: TokenValidationMiddlewarePort.Param
  ): TokenValidationMiddlewarePort.Response;
}
