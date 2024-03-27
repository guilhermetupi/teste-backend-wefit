import { TypeOrmCreateVendorOrBuyerRepository } from "@/adapters/database/orm/repositories/vendors-and-buyers";
import { AppDataSource } from "@/config/orm";
import { CreateVendorOrBuyerRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";

class TypeOrmCreateVendorOrBuyerRepositoryFactory {
  static create(): CreateVendorOrBuyerRepositoryPort {
    return new TypeOrmCreateVendorOrBuyerRepository(AppDataSource);
  }
}

export const typeOrmCreateVendorOrBuyerRepository =
  TypeOrmCreateVendorOrBuyerRepositoryFactory.create();
