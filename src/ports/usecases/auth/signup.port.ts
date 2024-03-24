import { CreateUserCommand } from "@/domain/commands";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
} from "@/domain/errors";
import { AuthResponse } from "@/types/auth";

export namespace SignupUseCasePort {
  export type Param = CreateUserCommand;

  export type Response =
    | AuthResponse
    | InternalServerError
    | ConflictError
    | InvalidParamError;
}

export abstract class SignupUseCasePort {
  abstract execute(
    data: SignupUseCasePort.Param
  ): Promise<SignupUseCasePort.Response>;
}
