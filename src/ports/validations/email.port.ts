export namespace EmailValidationPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class EmailValidationPort {
  abstract validate(
    email: EmailValidationPort.Param
  ): EmailValidationPort.Response;
}
