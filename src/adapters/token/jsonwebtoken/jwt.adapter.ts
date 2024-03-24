import { Environment } from "@/config/env";

export class JwtAdapter {
  public readonly secret: string;
  public readonly accessTokenExpiresIn: string;
  public readonly refreshTokenExpiresIn: string;

  constructor() {
    const { secret, accessTokenExpiresIn, refreshTokenExpiresIn } =
      Environment.tokenData;

    this.secret = secret;
    this.accessTokenExpiresIn = accessTokenExpiresIn;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
  }
}
