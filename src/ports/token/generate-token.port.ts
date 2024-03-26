import { InternalServerError } from "@/domain/errors";

export namespace GenerateTokenPort {
  export type Param = Record<string, any>;

  export type Response =
    | {
        accessToken: string;
      }
    | InternalServerError;
}

export abstract class GenerateTokenPort {
  abstract execute(
    payload: GenerateTokenPort.Param
  ): GenerateTokenPort.Response;
}
