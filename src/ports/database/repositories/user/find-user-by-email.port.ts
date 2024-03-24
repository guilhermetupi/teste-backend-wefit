import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export namespace FindUserByEmailRepositoryPort {
  export type Param = string;

  export type Response = User | undefined | InternalServerError;
}

export abstract class FindUserByEmailRepositoryPort {
  abstract execute(
    email: FindUserByEmailRepositoryPort.Param
  ): Promise<FindUserByEmailRepositoryPort.Response>;
}
