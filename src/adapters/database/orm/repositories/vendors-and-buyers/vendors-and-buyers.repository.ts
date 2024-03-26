import { DataSource, Repository } from "typeorm";
import { VendorsAndBuyersModel } from "../../models";

export class TypeOrmVendorsAndBuyersRepository {
  protected readonly repository: Repository<VendorsAndBuyersModel>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(VendorsAndBuyersModel);
  }
}