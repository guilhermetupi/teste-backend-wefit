import { HttpReponse } from "@/types/http";
import { AuthResponse } from "@/types/auth";
import { SignupDto } from "@/types/http/dto/auth";

export namespace SignupPresenterPort {
  export type Param = SignupDto;

  export type Response = HttpReponse<AuthResponse>;
}

export abstract class SignupPresenterPort {
  abstract execute(
    data: SignupPresenterPort.Param
  ): Promise<SignupPresenterPort.Response>;
}
