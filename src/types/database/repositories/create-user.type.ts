import { User } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export type CreateUserRepositoryResponse =
  | Omit<User, "password">
  | InternalServerError;
