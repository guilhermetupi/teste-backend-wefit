import {
  Document,
  PersonType,
  Address,
  Name,
  Email,
  Phone,
} from "@/domain/value-objects";

export class VendorOrBuyer {
  constructor(
    public readonly personType: PersonType,
    public readonly cnpj: Document | undefined,
    public readonly cpf: Document,
    public readonly name: Name,
    public readonly mobilePhone: Phone,
    public readonly telephone: Phone,
    public readonly email: Email,
    public readonly address: Address
  ) {}
}
