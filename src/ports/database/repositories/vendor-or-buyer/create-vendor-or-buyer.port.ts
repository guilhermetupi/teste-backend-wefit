import { VendorOrBuyer } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export namespace CreateVendorOrBuyerRepositoryPort {
  export type Param = {
    userId: string;
    vendorOrBuyer: VendorOrBuyer;
  };

  export type Response = void | InternalServerError;
}

export abstract class CreateVendorOrBuyerRepositoryPort {
  abstract execute(
    vendorOrBuyer: CreateVendorOrBuyerRepositoryPort.Param
  ): Promise<CreateVendorOrBuyerRepositoryPort.Response>;
}
