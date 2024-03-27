import { VendorOrBuyerExpressRouteAdapter } from "@/adapters/http/express/routes/vendor-or-buyer";
import { MiddlewareHttpPort } from "@/ports/http";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";

class CreateVendorOrBuyerPresenterAdapterStub
  implements CreateVendorOrBuyerPresenterPort
{
  async execute(
    param: CreateVendorOrBuyerPresenterPort.Param
  ): Promise<CreateVendorOrBuyerPresenterPort.Response> {
    return new Promise((res) =>
      res({
        status: 200,
      })
    );
  }
}

class AuthTokenExpressMiddlewareAdapter implements MiddlewareHttpPort {
  async execute(
    req: any,
    res: any,
    next: any
  ): Promise<Record<string, any> | void> {
    next();
  }
}

export function makeSut() {
  const createVendorOrBuyerPresenterAdapterStub =
    new CreateVendorOrBuyerPresenterAdapterStub();
  const authTokenExpressMiddlewareAdapter =
    new AuthTokenExpressMiddlewareAdapter();
  const sut = new VendorOrBuyerExpressRouteAdapter(
    createVendorOrBuyerPresenterAdapterStub,
    authTokenExpressMiddlewareAdapter
  );

  return {
    sut,
    createVendorOrBuyerPresenterAdapterStub,
    authTokenExpressMiddlewareAdapter,
  };
}
