import { CreateVendorOrBuyerCommand } from "@/domain/commands";
import {
  InvalidParamError,
  ConflictError,
  InternalServerError,
} from "@/domain/errors";

export namespace CreateVendorOrBuyerUseCasePort {
  export type Param = {
    userId: string;
    vendorOrBuyer: CreateVendorOrBuyerCommand;
  };

  export type Response =
    | void
    | InvalidParamError
    | ConflictError
    | InternalServerError;
}

export abstract class CreateVendorOrBuyerUseCasePort {
  abstract execute(
    vendorOrBuyer: CreateVendorOrBuyerUseCasePort.Param
  ): Promise<CreateVendorOrBuyerUseCasePort.Response>;
}