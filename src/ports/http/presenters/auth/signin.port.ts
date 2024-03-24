import { HttpReponse } from "@/types/http";
import { AuthResponse } from "@/types/auth";

export namespace SigninPresenterPort {
  export type Param = {
    email: string;
    password: string;
  };

  export type Response = HttpReponse<AuthResponse>;
}

export abstract class SigninPresenterPort {
  abstract execute(data: SigninPresenterPort.Param): Promise<SigninPresenterPort.Response>;
}
