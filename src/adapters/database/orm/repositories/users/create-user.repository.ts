import { DataSource } from "typeorm";
import { InternalServerError } from "@/domain/errors";
import { UserMapper } from "@/adapters/database/orm/repositories/mappers";
import { CreateUserRepositoryPort } from "@/ports/database/repositories/user";
import { User } from "@/domain/entities";
import { TypeOrmUserRepository } from "./users.repository";

export class TypeOrmCreateUserRepository
  extends TypeOrmUserRepository
  implements CreateUserRepositoryPort
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async execute(user: User): Promise<CreateUserRepositoryPort.Response> {
    try {
      const userPersistence = UserMapper.toPersistence(user);

      const createdUser = await this.repository.save(userPersistence);
      const userEntity = UserMapper.toEntity(createdUser);

      return userEntity;
    } catch {
      return new InternalServerError();
    }
  }
}
