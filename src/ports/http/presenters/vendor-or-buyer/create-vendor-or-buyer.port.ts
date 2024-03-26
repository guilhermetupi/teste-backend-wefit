import { HttpReponse } from "@/types/http";
import { CreateVendorOrBuyerDto } from "@/types/http/dto/vendor-or-buyer";

export namespace CreateVendorOrBuyerPresenterPort {
  export type Param = {
    vendorOrBuyer: CreateVendorOrBuyerDto;
    userId: string;
  };

  export type Response = HttpReponse<void>;
}

export abstract class CreateVendorOrBuyerPresenterPort {
  abstract execute(
    data: CreateVendorOrBuyerPresenterPort.Param
  ): Promise<CreateVendorOrBuyerPresenterPort.Response>;
}
