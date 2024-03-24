import { DataSource } from "typeorm";
import { InternalServerError } from "@/domain/errors";
import { VendorOrBuyerMapper } from "@/adapters/database/orm/repositories/mappers";
import { CreateVendorOrBuyerRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";
import { TypeOrmVendorsAndBuyersRepository } from "./vendors-and-buyers.repository";

export class TypeOrmCreateVendorOrBuyerRepository
  extends TypeOrmVendorsAndBuyersRepository
  implements CreateVendorOrBuyerRepositoryPort
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async execute({
    userId,
    vendorOrBuyer,
  }: CreateVendorOrBuyerRepositoryPort.Param): Promise<CreateVendorOrBuyerRepositoryPort.Response> {
    try {
      const newVendorOrBuyer = VendorOrBuyerMapper.toPersistence(
        userId,
        vendorOrBuyer
      );
      await this.repository.insert(newVendorOrBuyer);
    } catch {
      return new InternalServerError();
    }
  }
}
