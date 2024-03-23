import { CreateUserCommand } from "@/domain/commands";
import {
  InvalidParamError,
  ConflictError,
  InternalServerError,
} from "@/domain/errors";

export namespace CreateUserUseCasePort {
  export type Param = CreateUserCommand;
  
  export type Response =
    | string
    | InvalidParamError
    | ConflictError
    | InternalServerError;
}

export abstract class CreateUserUseCasePort {
  abstract execute(
    user: CreateUserUseCasePort.Param
  ): Promise<CreateUserUseCasePort.Response>;
}
