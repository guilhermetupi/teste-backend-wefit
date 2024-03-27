import { TypeOrmCreateUserRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";

export function makeSut() {
  const sut = new TypeOrmCreateUserRepository(AppDataSource);

  return { sut };
}
