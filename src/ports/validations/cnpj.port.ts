export namespace CnpjValidationPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class CnpjValidationPort {
  abstract validate(
    cpf: CnpjValidationPort.Param
  ): CnpjValidationPort.Response;
}
