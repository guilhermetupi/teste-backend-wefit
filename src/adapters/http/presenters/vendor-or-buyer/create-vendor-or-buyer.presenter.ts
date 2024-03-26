import { CreateVendorOrBuyerCommand } from "@/domain/commands";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
} from "@/domain/errors";
import {
  Address,
  Document,
  Email,
  Name,
  PersonType,
  Phone,
} from "@/domain/value-objects";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";
import { HttpStatusCode } from "@/types/http";
import { CreateVendorOrBuyerDto } from "@/types/http/dto/vendor-or-buyer";

export class CreateVendorOrBuyerPresenterAdapter
  implements CreateVendorOrBuyerPresenterPort
{
  constructor(
    private readonly createVendorOrBuyerUseCase: CreateVendorOrBuyerUseCasePort
  ) {}

  async execute({
    vendorOrBuyer,
    userId,
  }: CreateVendorOrBuyerPresenterPort.Param): Promise<CreateVendorOrBuyerPresenterPort.Response> {
    try {
      const {
        address,
        cnpj,
        cpf,
        email,
        emailConfirmation,
        mobilePhone,
        name,
        personType,
        telephone,
      } = this.createValueObjects(vendorOrBuyer);

      const createVendorOrBuyerCommand = new CreateVendorOrBuyerCommand(
        personType,
        name,
        cnpj,
        cpf,
        email,
        emailConfirmation,
        mobilePhone,
        telephone,
        address
      );

      const response = await this.createVendorOrBuyerUseCase.execute({
        vendorOrBuyer: createVendorOrBuyerCommand,
        userId,
      });

      if (response instanceof InvalidParamError) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message: response.message,
        };
      }

      if (response instanceof ConflictError) {
        return {
          status: HttpStatusCode.CONFLICT,
          message: response.message,
        };
      }

      if (response instanceof InternalServerError) {
        return {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: response.message,
        };
      }

      return {
        status: HttpStatusCode.CREATED,
        data: response,
      };
    } catch (error) {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: (error as InvalidParamError).message,
      };
    }
  }

  private createValueObjects(
    vendorOrBuyer: CreateVendorOrBuyerDto
  ): CreateVendorOrBuyerCommand {
    const personType = PersonType.create(vendorOrBuyer.personType);

    if (personType instanceof InvalidParamError) {
      throw personType;
    }

    const name = Name.create(vendorOrBuyer.name);

    if (name instanceof InvalidParamError) {
      throw name;
    }

    const cnpj = Document.create(vendorOrBuyer.cnpj);

    if (cnpj instanceof InvalidParamError) {
      throw cnpj;
    }

    const cpf = Document.create(vendorOrBuyer.cpf);

    if (cpf instanceof InvalidParamError) {
      throw cpf;
    }

    const email = Email.create(vendorOrBuyer.email);

    if (email instanceof InvalidParamError) {
      throw email;
    }

    const emailConfirmation = vendorOrBuyer.emailConfirmation;

    const mobilePhone = Phone.create(vendorOrBuyer.mobilePhone);

    if (mobilePhone instanceof InvalidParamError) {
      throw mobilePhone;
    }

    const telephone = Phone.create(vendorOrBuyer.telephone);

    if (telephone instanceof InvalidParamError) {
      throw telephone;
    }

    const address = Address.create(vendorOrBuyer.address);

    if (address instanceof InvalidParamError) {
      throw address;
    }

    return {
      personType,
      name,
      cnpj,
      cpf: cpf as Document,
      email,
      emailConfirmation,
      mobilePhone,
      telephone,
      address,
    };
  }
}
