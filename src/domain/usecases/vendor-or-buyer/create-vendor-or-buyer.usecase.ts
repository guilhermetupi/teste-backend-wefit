import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";
import { FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort } from "@/ports/database/repositories/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";

export class CreateVendorOrBuyerUseCase
  implements CreateVendorOrBuyerUseCasePort
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepositoryPort,
    private readonly findVendorOrBuyerByUserIdAndDocumentsRepository: FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort
  ) {}

  async execute(
    vendorOrBuyer: CreateVendorOrBuyerUseCasePort.Param
  ): Promise<CreateVendorOrBuyerUseCasePort.Response> {
    
  }
}
