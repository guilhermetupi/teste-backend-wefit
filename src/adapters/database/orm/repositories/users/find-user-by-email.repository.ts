import { DataSource } from "typeorm";
import { TypeOrmUserRepository } from "./users.repository";
import { UserMapper } from "../mappers";
import { InternalServerError } from "@/domain/errors";
import { FindUserByEmailRepositoryPort } from "@/ports/database/repositories/user";

export class TypeOrmFindUserByEmailRepository
  extends TypeOrmUserRepository
  implements FindUserByEmailRepositoryPort
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async execute(
    email: FindUserByEmailRepositoryPort.Param
  ): Promise<FindUserByEmailRepositoryPort.Response> {
    try {
      const userPersistence = await this.repository.findOne({
        select: ["id", "email", "password"],
        where: { email },
      });

      if (!userPersistence) {
        return undefined;
      }

      const userEntity = UserMapper.toEntity(userPersistence, false);
      return userEntity;
    } catch {
      return new InternalServerError();
    }
  }
}
