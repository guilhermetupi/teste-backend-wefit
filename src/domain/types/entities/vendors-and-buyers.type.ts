export enum PersonTypeEnum {
  INDIVIDUAL = "Pessoa Física",
  LEGAL = "Pessoa Jurídica",
}

export type AddressType = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};