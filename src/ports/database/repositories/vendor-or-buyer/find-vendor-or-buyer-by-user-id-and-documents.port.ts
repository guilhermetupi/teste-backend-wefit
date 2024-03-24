import { VendorOrBuyer } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";
import { DocumentType } from "@/domain/types/entities";

export namespace FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort {
  export type Param = {
    userId: string;
    document: string;
  };

  export type Response = VendorOrBuyer | undefined | InternalServerError;
}

export abstract class FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort {
  abstract execute(
    data: FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Param
  ): Promise<FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort.Response>;
}
