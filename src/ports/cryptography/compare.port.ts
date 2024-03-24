export namespace CompareCryptographyPort {
  export type Params = {
    plainText: string;
    hashed: string;
  };

  export type Result = boolean;
}

export abstract class CompareCryptographyPort {
  abstract execute(
    data: CompareCryptographyPort.Params
  ): CompareCryptographyPort.Result;
}
