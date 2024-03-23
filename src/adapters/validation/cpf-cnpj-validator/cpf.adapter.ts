import { CpfValidationPort } from "@/ports/validations";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class CpfCpfCnpjValidtorValidationAdapter implements CpfValidationPort {
  validate(cpf: string): boolean {
    return cpfValidator.isValid(cpf);
  }
}
