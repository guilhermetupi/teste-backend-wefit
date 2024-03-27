import { CreateVendorOrBuyerPresenterAdapter } from "@/adapters/http/presenters/vendor-or-buyer";
import { createVendorOrBuyerUseCase } from "@/config/factories/usecases/vendor-or-buyer";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";

class CreateVendorOrBuyerPresenterAdapterFactory {
  static create(): CreateVendorOrBuyerPresenterPort {
    return new CreateVendorOrBuyerPresenterAdapter(createVendorOrBuyerUseCase);
  }
}

export const createVendorOrBuyerPresenterAdapter =
  CreateVendorOrBuyerPresenterAdapterFactory.create();
