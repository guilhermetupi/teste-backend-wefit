export namespace PasswordValidationPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class PasswordValidationPort {
  abstract validate(
    password: PasswordValidationPort.Param
  ): PasswordValidationPort.Response;
}
