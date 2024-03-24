import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export type CreateOrFindUserRepositoryResponse =
  | Omit<User, "password">
  | undefined
  | InternalServerError;
