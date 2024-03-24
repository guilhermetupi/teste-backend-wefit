import { DataSource, Repository } from "typeorm";
import { UsersModel } from "../../models";

export class TypeOrmUserRepository {
  public readonly repository: Repository<UsersModel>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UsersModel);
  }
}
