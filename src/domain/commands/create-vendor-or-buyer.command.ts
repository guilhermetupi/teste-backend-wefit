import {
  PersonType,
  Document,
  Email,
  Phone,
  Address,
  Name,
} from "../value-objects";

export class CreateVendorOrBuyerCommand {
  constructor(
    public readonly personType: PersonType,
    public readonly name: Name,
    public readonly cnpj: Document | undefined,
    public readonly cpf: Document,
    public readonly email: Email,
    public readonly mobilePhone: Phone,
    public readonly telephone: Phone,
    public readonly address: Address,
  ) {}
}
