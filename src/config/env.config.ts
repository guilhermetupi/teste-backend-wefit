export class Environment {
  public static getHttpServerPort(): number {
    return Number(process.env.HTTP_PORT) || 4568;
  }
}
