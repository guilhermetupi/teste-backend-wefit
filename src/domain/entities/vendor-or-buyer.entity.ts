import {
  Document,
  PersonType,
  VendorOrBuyerAddress,
  Name,
  Email,
  Phone,
} from "@/domain/value-objects";

export class VendorOrBuyer {
  constructor(
    public readonly personType: PersonType,
    public readonly cnpj: Document,
    public readonly cpf: Document,
    public readonly name: Name,
    public readonly cellphone: Phone,
    public readonly telephone: Phone,
    public readonly email: Email,
    public readonly address: VendorOrBuyerAddress
  ) {}
}
