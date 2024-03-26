import { TypeOrmCreateUserRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";
import { CreateUserRepositoryPort } from "@/ports/database/repositories/user";

export class TypeOrmCreateUserRepositoryFactory {
  static create(): CreateUserRepositoryPort {
    return new TypeOrmCreateUserRepository(AppDataSource);
  }
}
