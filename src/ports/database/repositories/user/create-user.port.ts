import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";
import { CreateOrFindUserRepositoryResponse } from "@/domain/types/database/repositories";

export namespace CreateUserRepositoryPort {
  export type Param = User;

  export type Response =
    | CreateOrFindUserRepositoryResponse
    | InternalServerError;
}

export abstract class CreateUserRepositoryPort {
  abstract execute(
    user: CreateUserRepositoryPort.Param
  ): Promise<CreateUserRepositoryPort.Response>;
}
