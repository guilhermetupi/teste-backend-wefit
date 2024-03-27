import { TypeOrmFindUserByIdRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";
import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";

class TypeOrmFindUserByIdRepositoryFactory {
  static create(): FindUserByIdRepositoryPort {
    return new TypeOrmFindUserByIdRepository(AppDataSource);
  }
}

export const typeOrmFindUserByIdRepository =
  TypeOrmFindUserByIdRepositoryFactory.create();
