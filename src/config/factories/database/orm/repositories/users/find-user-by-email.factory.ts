import { TypeOrmFindUserByEmailRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";
import { FindUserByEmailRepositoryPort } from "@/ports/database/repositories/user";

class TypeOrmFindUserByEmailRepositoryFactory {
  static create(): FindUserByEmailRepositoryPort {
    return new TypeOrmFindUserByEmailRepository(AppDataSource);
  }
}

export const typeOrmFindUserByEmailRepository =
  TypeOrmFindUserByEmailRepositoryFactory.create();
