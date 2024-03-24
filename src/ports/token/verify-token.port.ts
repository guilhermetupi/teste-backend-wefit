export namespace VerifyTokenPort {
  export type Param = string;

  export type Response = boolean;
}

export abstract class VerifyTokenPort {
  abstract execute(token: VerifyTokenPort.Param): VerifyTokenPort.Response;
}
