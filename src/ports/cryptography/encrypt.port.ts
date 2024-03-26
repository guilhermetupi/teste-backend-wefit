export namespace EncryptCryptographyPort {
  export type Params = string;

  export type Response = string;
}

export abstract class EncryptCryptographyPort {
  abstract execute(
    data: EncryptCryptographyPort.Params
  ): EncryptCryptographyPort.Response;
}
