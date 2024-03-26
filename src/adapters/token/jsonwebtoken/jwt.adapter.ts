import { Environment } from "@/config/env";

export class JwtAdapter {
  protected readonly secret: string;
  protected readonly accessTokenExpiresIn: string;

  constructor() {
    const { secret, accessTokenExpiresIn } =
      Environment.tokenData;

    this.secret = secret;
    this.accessTokenExpiresIn = accessTokenExpiresIn;
  }
}
