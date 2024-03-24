import { CreateOrFindUserRepositoryResponse } from "@/domain/types/database/repositories";

export namespace FindUserByIdRepositoryPort {
  export type Param = string;

  export type Response = CreateOrFindUserRepositoryResponse ;  
}

export abstract class FindUserByIdRepositoryPort {
  abstract execute(
    id: FindUserByIdRepositoryPort.Param
  ): Promise<FindUserByIdRepositoryPort.Response>;
}
