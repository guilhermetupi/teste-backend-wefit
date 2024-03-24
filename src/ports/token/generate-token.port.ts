import { InternalServerError } from "@/domain/errors";

export namespace GenerateTokenPort {
  export type Param = string;

  export type Response =
    | {
        accessToken: string;
        refreshToken: string;
      }
    | InternalServerError;
}

export abstract class GenerateTokenPort {
  abstract execute(
    payload: GenerateTokenPort.Param
  ): GenerateTokenPort.Response;
}
