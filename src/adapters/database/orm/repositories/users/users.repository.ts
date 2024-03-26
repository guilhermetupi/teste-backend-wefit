import { DataSource, Repository } from "typeorm";
import { UsersModel } from "../../models";

export class TypeOrmUserRepository {
  protected readonly repository: Repository<UsersModel>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UsersModel);
  }
}
