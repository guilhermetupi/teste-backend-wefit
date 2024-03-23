import { CreateOrFindUserRepositoryResponse } from "@/domain/types/database/repositories";

export namespace FindUserByEmailRepositoryPort {
  export type Param = string;

  export type Response = CreateOrFindUserRepositoryResponse;
}

export abstract class FindUserByEmailRepositoryPort {
  abstract execute(
    email: FindUserByEmailRepositoryPort.Param
  ): Promise<FindUserByEmailRepositoryPort.Response>;
}
