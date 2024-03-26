import { TypeOrmCreateVendorOrBuyerRepository } from "@/adapters/database/orm/repositories/vendors-and-buyers";
import { AppDataSource } from "@/config/orm";
import { CreateVendorOrBuyerRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";

export class TypeOrmCreateVendorOrBuyerRepositoryFactory {
  static create(): CreateVendorOrBuyerRepositoryPort {
    return new TypeOrmCreateVendorOrBuyerRepository(AppDataSource);
  }
}
