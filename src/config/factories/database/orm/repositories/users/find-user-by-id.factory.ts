import { TypeOrmFindUserByIdRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";
import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";

export class TypeOrmFindUserByIdRepositoryFactory {
  static create(): FindUserByIdRepositoryPort {
    return new TypeOrmFindUserByIdRepository(AppDataSource);
  }
}
