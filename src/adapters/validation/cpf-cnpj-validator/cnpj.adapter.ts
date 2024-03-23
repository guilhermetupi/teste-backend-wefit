import { CnpjValidationPort } from "@/ports/validations";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";

export class CnpjCpfCnpjValidtorValidationAdapter
  implements CnpjValidationPort
{
  validate(cnpj: string): boolean {
    return cnpjValidator.isValid(cnpj);
  }
}
