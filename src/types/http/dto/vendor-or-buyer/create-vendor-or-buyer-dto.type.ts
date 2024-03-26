import { AddressType, PersonTypeEnum } from "@/types/entities";

export type CreateVendorOrBuyerDto = {
  personType: PersonTypeEnum;
  name: string;
  cnpj: string;
  cpf: string;
  email: string;
  emailConfirmation: string;
  mobilePhone: string;
  telephone: string;
  address: AddressType;
};
