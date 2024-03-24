import { HttpReponse } from "@/types/http";

export namespace TokenValidationPresenterPort {
  export type Param = string;

  export type Response = HttpReponse;
}

export abstract class TokenValidationPresenterPort {
  abstract execute(
    token: TokenValidationPresenterPort.Param
  ): TokenValidationPresenterPort.Response;
}
