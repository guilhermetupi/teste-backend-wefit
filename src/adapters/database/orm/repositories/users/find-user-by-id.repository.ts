import { DataSource } from "typeorm";
import { TypeOrmUserRepository } from "./users.repository";
import { UserMapper } from "../mappers";
import { InternalServerError } from "@/domain/errors";
import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";

export class TypeOrmFindUserByIdRepository
  extends TypeOrmUserRepository
  implements FindUserByIdRepositoryPort
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async execute(
    id: FindUserByIdRepositoryPort.Param
  ): Promise<FindUserByIdRepositoryPort.Response> {
    try {
      const userPersistence = await this.repository.findOne({
        where: { id },
      });

      if (!userPersistence) {
        return undefined;
      }

      const userEntity = UserMapper.toEntity(userPersistence);
      return userEntity;
    } catch {
      return new InternalServerError();
    }
  }
}
