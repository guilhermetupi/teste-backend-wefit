import { TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository } from "@/adapters/database/orm/repositories/vendors-and-buyers";
import { AppDataSource } from "@/config/orm";

export function makeSut() {
  const sut = new TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository(AppDataSource);

  return {
    sut,
  };
}
