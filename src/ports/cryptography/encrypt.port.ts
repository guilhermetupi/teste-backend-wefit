export namespace EncryptCryptographyPort {
  export type Params = string;

  export type Result = string;
}

export abstract class EncryptCryptographyPort {
  abstract execute(
    data: EncryptCryptographyPort.Params
  ): EncryptCryptographyPort.Result;
}
