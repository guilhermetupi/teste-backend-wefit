import { CreateVendorOrBuyerPresenterAdapter } from "@/adapters/http/presenters/vendor-or-buyer";
import { CreateVendorOrBuyerUseCaseFactory } from "@/config/factories/usecases/vendor-or-buyer";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";

export class CreateVendorOrBuyerPresenterAdapterFactory {
  static create(): CreateVendorOrBuyerPresenterPort {
    const createVendorOrBuyerUseCase =
      CreateVendorOrBuyerUseCaseFactory.create();

    return new CreateVendorOrBuyerPresenterAdapter(createVendorOrBuyerUseCase);
  }
}
