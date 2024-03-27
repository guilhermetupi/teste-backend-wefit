import { TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository } from "@/adapters/database/orm/repositories/vendors-and-buyers";
import { FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";
import { AppDataSource } from "@/config/orm";

class TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepositoryFactory {
  static create(): FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort {
    return new TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository(
      AppDataSource
    );
  }
}

export const typeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository =
  TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepositoryFactory.create();
