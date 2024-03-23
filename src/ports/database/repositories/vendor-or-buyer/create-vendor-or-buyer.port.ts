import { VendorOrBuyer } from "@/domain/entities";

export namespace CreateVendorOrBuyerRepositoryPort {
  export type Param = VendorOrBuyer;

  export type Response = void;
}

export abstract class CreateVendorOrBuyerRepositoryPort {
  abstract createVendorOrBuyer(
    vendorOrBuyer: CreateVendorOrBuyerRepositoryPort.Param
  ): Promise<CreateVendorOrBuyerRepositoryPort.Response>;
}
