export namespace PhoneValidationPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class PhoneValidationPort {
  abstract validate(
    phone: PhoneValidationPort.Param
  ): PhoneValidationPort.Response;
}
