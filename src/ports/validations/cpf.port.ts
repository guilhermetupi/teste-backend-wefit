export namespace CpfValidationPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class CpfValidationPort {
  abstract validate(
    cpf: CpfValidationPort.Param
  ): CpfValidationPort.Response;
}
