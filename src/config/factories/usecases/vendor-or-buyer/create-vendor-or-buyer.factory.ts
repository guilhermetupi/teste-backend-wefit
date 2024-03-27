import { CreateVendorOrBuyerUseCase } from "@/domain/usecases/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";
import { typeOrmFindUserByIdRepository } from "../../database/orm/repositories/users";
import {
  typeOrmCreateVendorOrBuyerRepository,
  typeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository,
} from "../../database/orm/repositories/vendor-and-buyers";

class CreateVendorOrBuyerUseCaseFactory {
  static create(): CreateVendorOrBuyerUseCasePort {
    return new CreateVendorOrBuyerUseCase(
      typeOrmFindUserByIdRepository,
      typeOrmFindVendorOrBuyerByUserIdAndDocumentsRepository,
      typeOrmCreateVendorOrBuyerRepository
    );
  }
}

export const createVendorOrBuyerUseCase =
  CreateVendorOrBuyerUseCaseFactory.create();
