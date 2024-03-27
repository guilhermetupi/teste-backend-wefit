import { TypeOrmCreateVendorOrBuyerRepository } from "@/adapters/database/orm/repositories/vendors-and-buyers";
import { AppDataSource } from "@/config/orm";

export function makeSut() {
  const sut = new TypeOrmCreateVendorOrBuyerRepository(AppDataSource);

  return {
    sut,
  };
}
