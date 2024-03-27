import { CreateVendorOrBuyerPresenterAdapter } from "@/adapters/http/presenters/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";

class CreateVendorOrBuyerUseCaseStub implements CreateVendorOrBuyerUseCasePort {
  async execute(
    data: CreateVendorOrBuyerUseCasePort.Param
  ): Promise<CreateVendorOrBuyerUseCasePort.Response> {}
}

export function makeSut() {
  const createVendorOrBuyerUseCaseStub = new CreateVendorOrBuyerUseCaseStub();
  const sut = new CreateVendorOrBuyerPresenterAdapter(
    createVendorOrBuyerUseCaseStub
  );

  return {
    sut,
    createVendorOrBuyerUseCaseStub,
  };
}
