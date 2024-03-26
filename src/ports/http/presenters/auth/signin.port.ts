import { HttpReponse } from "@/types/http";
import { AuthResponse } from "@/types/auth";
import { SigninDto } from "@/types/http/dto/auth";

export namespace SigninPresenterPort {
  export type Param = SigninDto;

  export type Response = HttpReponse<AuthResponse>;
}

export abstract class SigninPresenterPort {
  abstract execute(
    data: SigninPresenterPort.Param
  ): Promise<SigninPresenterPort.Response>;
}
