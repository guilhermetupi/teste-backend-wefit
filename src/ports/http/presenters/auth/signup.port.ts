import { HttpReponse } from "@/types/http";
import { AuthResponse } from "@/types/auth";

export namespace SignupPresenterPort {
  export type Param = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  export type Response = HttpReponse<AuthResponse>;
}

export abstract class SignupPresenterPort {
  abstract execute(data: SignupPresenterPort.Param): Promise<SignupPresenterPort.Response>;
}
