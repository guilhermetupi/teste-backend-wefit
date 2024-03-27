import { ConflictError, NotFoundError } from "@/domain/errors";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";
import { FindUserByIdRepositoryPort } from "@/ports/database/repositories/user";
import {
  CreateVendorOrBuyerRepositoryPort,
  FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort,
} from "@/ports/database/repositories/vendor-or-buyer";
import { VendorOrBuyer } from "@/domain/entities";

export class CreateVendorOrBuyerUseCase
  implements CreateVendorOrBuyerUseCasePort
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepositoryPort,
    private readonly findVendorOrBuyerByUserIdAndDocumentsRepository: FindVendorOrBuyerByUserIdAndDocumentsRepositoryPort,
    private readonly createVendorOrBuyerRepository: CreateVendorOrBuyerRepositoryPort
  ) {}

  async execute({
    userId,
    vendorOrBuyer,
  }: CreateVendorOrBuyerUseCasePort.Param): Promise<CreateVendorOrBuyerUseCasePort.Response> {
    const userExists = await this.checkIfUserExists(userId);

    if (userExists instanceof Error) {
      return userExists;
    }

    const vendorOrBuyerExists = await this.checkIfVendorOrBuyerExists(
      userId,
      vendorOrBuyer.cnpj?.value || (vendorOrBuyer.cpf.value as string)
    );

    if (vendorOrBuyerExists instanceof Error) {
      return vendorOrBuyerExists;
    }

    const newVendorOrBuyer = new VendorOrBuyer(
      vendorOrBuyer.personType,
      vendorOrBuyer.cnpj,
      vendorOrBuyer.cpf,
      vendorOrBuyer.name,
      vendorOrBuyer.mobilePhone,
      vendorOrBuyer.telephone,
      vendorOrBuyer.email,
      vendorOrBuyer.address
    );

    const createdVendorOrBuyer =
      await this.createVendorOrBuyerRepository.execute({
        userId,
        vendorOrBuyer: newVendorOrBuyer,
      });

    if (createdVendorOrBuyer instanceof Error) {
      return createdVendorOrBuyer;
    }
  }

  private async checkIfUserExists(
    userId: string
  ): Promise<true | NotFoundError> {
    const user = await this.findUserByIdRepository.execute(userId);

    if (!user) {
      return new NotFoundError("Usuário não encontrado.");
    }

    return true;
  }

  private async checkIfVendorOrBuyerExists(
    userId: string,
    document: string
  ): Promise<false | ConflictError> {
    const vendorOrBuyer =
      await this.findVendorOrBuyerByUserIdAndDocumentsRepository.execute({
        userId,
        document,
      });

    if (vendorOrBuyer) {
      return new ConflictError("Vendedor ou comprador já cadastrado.");
    }

    return false;
  }
}
