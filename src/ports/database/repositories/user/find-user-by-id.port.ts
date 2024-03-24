import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export namespace FindUserByIdRepositoryPort {
  export type Param = string;

  export type Response =
    | Omit<User, "password">
    | undefined
    | InternalServerError;
}

export abstract class FindUserByIdRepositoryPort {
  abstract execute(
    id: FindUserByIdRepositoryPort.Param
  ): Promise<FindUserByIdRepositoryPort.Response>;
}
