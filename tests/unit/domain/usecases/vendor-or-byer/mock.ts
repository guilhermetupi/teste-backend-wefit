import { User, VendorOrBuyer } from "@/domain/entities";
import { CreateVendorOrBuyerUseCase } from "@/domain/usecases/vendor-or-buyer";
import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";
import {
  CreateVendorOrBuyerRepositoryPort,
  FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort,
} from "@/ports/database/repositories/vendor-or-buyer";

class FindUserByIdRepositoryStub implements FindUserByIdRepositoryPort {
  async execute(id: string): Promise<FindUserByIdRepositoryPort.Response> {
    return new Promise<Omit<User, "password">>((res) =>
      res({ id: "any_id", email: { value: "any_email" } } as any)
    );
  }
}

class FindVendorOrBuyerByUserIdAndDocumentsRepositoryStub
  implements FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort
{
  async execute(
    data: FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Param
  ): Promise<FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Response> {
    return new Promise<undefined>((res) => res(undefined));
  }
}

class CreateVendorOrBuyerRepositoryStub
  implements CreateVendorOrBuyerRepositoryPort
{
  async execute(
    data: CreateVendorOrBuyerRepositoryPort.Param
  ): Promise<CreateVendorOrBuyerRepositoryPort.Response> {
    return new Promise<void>((res) => res({} as any));
  }
}

export function makeSut() {
  const findUserByIdRepositoryStub = new FindUserByIdRepositoryStub();
  const findVendorOrBuyerByUserIdAndDocumentsRepositoryStub =
    new FindVendorOrBuyerByUserIdAndDocumentsRepositoryStub();
  const createVendorOrBuyerRepositoryStub =
    new CreateVendorOrBuyerRepositoryStub();
  const sut = new CreateVendorOrBuyerUseCase(
    findUserByIdRepositoryStub,
    findVendorOrBuyerByUserIdAndDocumentsRepositoryStub,
    createVendorOrBuyerRepositoryStub
  );

  return {
    sut,
    findUserByIdRepositoryStub,
    findVendorOrBuyerByUserIdAndDocumentsRepositoryStub,
    createVendorOrBuyerRepositoryStub,
  };
}
