import { TypeOrmCreateUserRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";
import { CreateUserRepositoryPort } from "@/ports/database/repositories/user";

class TypeOrmCreateUserRepositoryFactory {
  static create(): CreateUserRepositoryPort {
    return new TypeOrmCreateUserRepository(AppDataSource);
  }
}

export const typeOrmCreateUserRepository =
  TypeOrmCreateUserRepositoryFactory.create();
