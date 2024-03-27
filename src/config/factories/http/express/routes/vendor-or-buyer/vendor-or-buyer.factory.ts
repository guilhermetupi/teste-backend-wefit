import Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { VendorOrBuyerExpressRouteAdapter } from "@/adapters/http/express/routes/vendor-or-buyer";
import { createVendorOrBuyerPresenterAdapter } from "../../../presenters/vendor-or-buyer";
import { authTokenExpressMiddlewareAdapter } from "../../middlewares/auth";

class VendorOrBuyerExpressRouteAdapterFactory {
  static create(): HttpRouteAdapterPort<Express.Router> {
    return new VendorOrBuyerExpressRouteAdapter(
      createVendorOrBuyerPresenterAdapter,
      authTokenExpressMiddlewareAdapter
    );
  }
}

export const vendorOrBuyerExpressRouteAdapter =
  VendorOrBuyerExpressRouteAdapterFactory.create();
