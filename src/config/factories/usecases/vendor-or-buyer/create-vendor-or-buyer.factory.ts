import { CreateVendorOrBuyerUseCase } from "@/domain/usecases/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";
import { TypeOrmFindUserByIdRepositoryFactory } from "../../database/orm/repositories/users";
import {
  TypeOrmCreateVendorOrBuyerRepositoryFactory,
  TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepositoryFactory,
} from "../../database/orm/repositories/vendor-and-buyers";

export class CreateVendorOrBuyerUseCaseFactory {
  static create(): CreateVendorOrBuyerUseCasePort {
    const findUserByIdRepository =
      TypeOrmFindUserByIdRepositoryFactory.create();
    const findVendorOrBuyerByUserIdAndDocumentsRepository =
      TypeOrmFindVendorOrBuyerByUserIdAndDocumentsRepositoryFactory.create();
    const createVendorOrBuyerRepository =
      TypeOrmCreateVendorOrBuyerRepositoryFactory.create();

    return new CreateVendorOrBuyerUseCase(
      findUserByIdRepository,
      findVendorOrBuyerByUserIdAndDocumentsRepository,
      createVendorOrBuyerRepository
    );
  }
}
