import { VendorsAndBuyersModel } from "@/adapters/database/orm/models";
import { VendorOrBuyer } from "@/domain/entities";
import { InvalidParamError } from "@/domain/errors";
import {
  Address,
  Document,
  Email,
  Name,
  PersonType,
  Phone,
} from "@/domain/value-objects";

export class VendorOrBuyerMapper {
  static toEntity(vendorOrBuyer: VendorsAndBuyersModel): VendorOrBuyer {
    const {
      personType,
      cnpj,
      cpf,
      mobilePhone,
      telephone,
      email,
      address,
      name,
    } = VendorOrBuyerMapper.createValueObjects(vendorOrBuyer);

    return new VendorOrBuyer(
      personType,
      cnpj,
      cpf as Document,
      name as Name,
      mobilePhone as Phone,
      telephone as Phone,
      email as Email,
      address as Address
    );
  }

  private static createValueObjects(vendorOrBuyer: VendorsAndBuyersModel) {
    const personType = PersonType.create(vendorOrBuyer.personType);

    if (personType instanceof InvalidParamError) {
      throw personType;
    }

    const cnpj = Document.create({
      document: vendorOrBuyer.cnpj,
      required: false,
      isCpf: false,
    });

    if (cnpj instanceof InvalidParamError) {
      throw cnpj;
    }

    const cpf = Document.create({
      document: vendorOrBuyer.cpf,
    });

    if (cpf instanceof InvalidParamError) {
      throw cpf;
    }

    const mobilePhone = Phone.create(vendorOrBuyer.mobilePhone);

    if (mobilePhone instanceof InvalidParamError) {
      throw mobilePhone;
    }

    const telephone = Phone.create(vendorOrBuyer.telephone, false);

    if (telephone instanceof InvalidParamError) {
      throw telephone;
    }

    const email = Email.create(vendorOrBuyer.email);

    if (email instanceof InvalidParamError) {
      throw email;
    }

    const address = Address.create({
      cep: vendorOrBuyer.cep,
      city: vendorOrBuyer.city,
      neighborhood: vendorOrBuyer.neighborhood,
      number: vendorOrBuyer.number,
      state: vendorOrBuyer.state,
      street: vendorOrBuyer.street,
      complement: vendorOrBuyer.complement,
    });

    const name = Name.create(vendorOrBuyer.name);

    return {
      personType,
      cnpj,
      cpf,
      mobilePhone,
      telephone,
      email,
      address,
      name,
    };
  }

  static toPersistence(
    userId: string,
    vendorOrBuyer: VendorOrBuyer
  ): VendorsAndBuyersModel {
    const { cep, city, neighborhood, number, state, street, complement } =
      vendorOrBuyer.address.value;

    return {
      personType: vendorOrBuyer.personType.value,
      cnpj: vendorOrBuyer.cnpj?.value,
      cpf: vendorOrBuyer.cpf.value,
      mobilePhone: vendorOrBuyer.mobilePhone.value,
      telephone: vendorOrBuyer.telephone.value,
      email: vendorOrBuyer.email.value,
      name: vendorOrBuyer.name.value,
      cep,
      city,
      neighborhood,
      number,
      state,
      street,
      complement,
      userId,
    };
  }
}
