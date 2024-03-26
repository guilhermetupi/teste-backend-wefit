import Express, { Request, Response } from "express";
import { HttpRouteAdapterPort, MiddlewareHttpPort } from "@/ports/http";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";
import { ExpressRequest } from "@/types/http";

export class VendorOrBuyerExpressRouteAdapter
  implements HttpRouteAdapterPort<Express.Router>
{
  public readonly name = "vendors-or-buyers";

  constructor(
    private readonly createVendorOrBuyerPresenterAdapter: CreateVendorOrBuyerPresenterPort,
    private readonly authTokenExpressMiddlewareAdapter: MiddlewareHttpPort
  ) {}

  setup(router: Express.Router): void {
    router.post(
      '/',
      this.authTokenExpressMiddlewareAdapter.execute,
      async (req: Request, res: Response) => {
        const { userId } = req as ExpressRequest;
        const { vendorOrBuyer } = req.body as Omit<
          CreateVendorOrBuyerPresenterPort.Param,
          "userId"
        >;

        const { status, data, message } =
          await this.createVendorOrBuyerPresenterAdapter.execute({
            vendorOrBuyer,
            userId,
          });

        res.status(status).json({ data, message });
      }
    );
  }
}
