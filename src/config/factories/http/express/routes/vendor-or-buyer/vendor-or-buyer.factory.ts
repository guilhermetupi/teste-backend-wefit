import Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { VendorOrBuyerExpressRouteAdapter } from "@/adapters/http/express/routes/vendor-or-buyer";
import { CreateVendorOrBuyerPresenterAdapterFactory } from "../../../presenters/vendor-or-buyer";
import { AuthTokenExpressMiddlewareAdapterFactory } from "../../middlewares/auth";

export class VendorOrBuyerExpressRouteAdapterFactory {
  static create(): HttpRouteAdapterPort<Express.Router> {
    const createVendorOrBuyerPresenterAdapter =
      CreateVendorOrBuyerPresenterAdapterFactory.create();
    const authTokenExpressMiddlewareAdapter =
      AuthTokenExpressMiddlewareAdapterFactory.create();

    return new VendorOrBuyerExpressRouteAdapter(
      createVendorOrBuyerPresenterAdapter,
      authTokenExpressMiddlewareAdapter
    );
  }
}
