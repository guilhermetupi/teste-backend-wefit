import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";
import { CreateUserRepositoryResponse } from "@/types/database/repositories";

export namespace CreateUserRepositoryPort {
  export type Param = User;

  export type Response =
    | CreateUserRepositoryResponse
    | InternalServerError;
}

export abstract class CreateUserRepositoryPort {
  abstract execute(
    user: CreateUserRepositoryPort.Param
  ): Promise<CreateUserRepositoryPort.Response>;
}
