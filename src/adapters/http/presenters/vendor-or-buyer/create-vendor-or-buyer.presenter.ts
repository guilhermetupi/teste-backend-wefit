import {
  Address,
  Document,
  Email,
  Name,
  PersonType,
  Phone,
} from "@/domain/value-objects";
import { CreateVendorOrBuyerCommand } from "@/domain/commands";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
} from "@/domain/errors";
import { CreateVendorOrBuyerPresenterPort } from "@/ports/http/presenters/vendor-or-buyer";
import { CreateVendorOrBuyerUseCasePort } from "@/ports/usecases/vendor-or-buyer";
import { ErrorType } from "@/types/error";
import { HttpStatusCode } from "@/types/http";
import { CreateVendorOrBuyerDto } from "@/types/http/dto/vendor-or-buyer";
import { PersonTypeEnum } from "@/types/entities";

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
      const userIdNotProvided = !userId;
      console.log(userId);

      if (userIdNotProvided) {
        return {
          status: HttpStatusCode.UNAUTHORIZED,
          message: "Usuário não autorizado.",
        };
      }

      const termsNotAccepted = !vendorOrBuyer.acceptTerms;

      if (termsNotAccepted) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message:
            "Você deve aceitar os termos de uso para cadastrar um novo vendedor ou comprador.",
        };
      }

      const vendorOrBuyerIsLegalPersonAndCnpjNotProvided =
        vendorOrBuyer.personType === PersonTypeEnum.LEGAL &&
        !vendorOrBuyer.cnpj;

      if (vendorOrBuyerIsLegalPersonAndCnpjNotProvided) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message: "CNPJ é obrigatório para pessoa jurídica.",
        };
      }

      const vendorOrBuyerEmailIsDifferentFromEmailConfirmation =
        vendorOrBuyer.email !== vendorOrBuyer.emailConfirmation;

      if (vendorOrBuyerEmailIsDifferentFromEmailConfirmation) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Email e confirmação de email não correspondem.",
        };
      }

      const {
        address,
        cnpj,
        cpf,
        email,
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
        mobilePhone,
        telephone,
        address
      );

      const response = await this.createVendorOrBuyerUseCase.execute({
        vendorOrBuyer: createVendorOrBuyerCommand,
        userId,
      });

      const responseIsError = response instanceof Error;
      if (responseIsError) return this.makeErrorResponse(response);

      return {
        status: HttpStatusCode.CREATED,
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

    if (
      personType instanceof Error &&
      personType.name === ErrorType.INVALID_PARAM
    ) {
      throw personType;
    }

    const name = Name.create(vendorOrBuyer.name);

    if (name instanceof Error && name.name === ErrorType.INVALID_PARAM) {
      throw name;
    }

    const cnpj = Document.create({
      document: vendorOrBuyer.cnpj,
      required: false,
      isCpf: false,
    });

    if (cnpj instanceof Error && cnpj.name === ErrorType.INVALID_PARAM) {
      throw cnpj;
    }

    const cpf = Document.create({
      document: vendorOrBuyer.cpf,
    });

    if (cpf instanceof Error && cpf.name === ErrorType.INVALID_PARAM) {
      throw cpf;
    }

    const email = Email.create(vendorOrBuyer.email);

    if (email instanceof Error && email.name === ErrorType.INVALID_PARAM) {
      throw email;
    }

    const mobilePhone = Phone.create(vendorOrBuyer.mobilePhone);

    if (
      mobilePhone instanceof Error &&
      mobilePhone.name === ErrorType.INVALID_PARAM
    ) {
      throw mobilePhone;
    }

    const telephone = Phone.create(vendorOrBuyer.telephone, false);

    if (
      telephone instanceof Error &&
      telephone.name === ErrorType.INVALID_PARAM
    ) {
      throw telephone;
    }

    const address = Address.create(vendorOrBuyer.address);

    if (address instanceof Error && address.name === ErrorType.INVALID_PARAM) {
      throw address;
    }

    return {
      personType: personType as PersonType,
      name: name as Name,
      cnpj: cnpj as undefined | Document,
      cpf: cpf as Document,
      email: email as Email,
      mobilePhone: mobilePhone as Phone,
      telephone: telephone as Phone,
      address: address as Address,
    };
  }

  private makeErrorResponse(
    response: InvalidParamError | ConflictError | InternalServerError
  ) {
    console.log(response.name);
    switch (response.name) {
      case ErrorType.UNAUTHORIZED:
        return {
          status: HttpStatusCode.UNAUTHORIZED,
          message: response.message,
        };
      case ErrorType.INVALID_PARAM:
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message: response.message,
        };
      case ErrorType.CONFLICT:
        return {
          status: HttpStatusCode.CONFLICT,
          message: response.message,
        };
      case ErrorType.NOT_FOUND:
        return {
          status: HttpStatusCode.NOT_FOUND,
          message: response.message,
        };
      case ErrorType.INTERNAL_SERVER:
        return {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: response.message,
        };
      default:
        return {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: "Internal Server Error.",
        };
    }
  }
}
