import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { AuthResponse } from "@/types/auth";

export namespace SigninUseCasePort {
  export type Param = {
    email: string;
    password: string;
  };

  export type Response = AuthResponse | InternalServerError | UnauthorizedError;
}

export abstract class SigninUseCasePort {
  abstract execute(
    data: SigninUseCasePort.Param
  ): Promise<SigninUseCasePort.Response>;
}
