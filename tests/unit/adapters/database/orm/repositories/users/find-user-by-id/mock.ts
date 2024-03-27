import { TypeOrmFindUserByIdRepository } from "@/adapters/database/orm/repositories/users";
import { AppDataSource } from "@/config/orm";

export function makeSut() {
  const sut = new TypeOrmFindUserByIdRepository(AppDataSource);

  return { sut };
}
