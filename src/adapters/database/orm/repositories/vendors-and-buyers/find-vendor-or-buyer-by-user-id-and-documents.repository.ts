import { FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";
import { TypeOrmVendorsAndBuyersRepository } from "./vendors-and-buyers.repository";
import { DataSource } from "typeorm";
import { VendorOrBuyerMapper } from "../mappers";
import { InternalServerError } from "@/domain/errors";

export class TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository
  extends TypeOrmVendorsAndBuyersRepository
  implements FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async execute({
    userId,
    document,
  }: FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Param): Promise<FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Response> {
    try {
      const vendorOrBuyer = await this.repository.findOne({
        where: [
          {
            userId,
            cnpj: document,
          },
          {
            userId,
            cpf: document,
          },
        ],
      });

      if (!vendorOrBuyer) return;

      const vendorOrBuyerEntity = VendorOrBuyerMapper.toEntity(vendorOrBuyer);
      return vendorOrBuyerEntity;
    } catch {
      return new InternalServerError();
    }
  }
}
