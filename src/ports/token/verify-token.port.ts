import { UnauthorizedError } from "@/domain/errors";

export namespace VerifyTokenPort {
  export type Param = string;

  export type Response<T> = T | UnauthorizedError;
}

export abstract class VerifyTokenPort {
  abstract execute<T = Record<string, any>>(
    token: VerifyTokenPort.Param
  ): VerifyTokenPort.Response<T>;
}
