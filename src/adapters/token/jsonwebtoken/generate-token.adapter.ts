import jwt from "jsonwebtoken";
import { GenerateTokenPort } from "@/ports/token";
import { JwtAdapter } from "./jwt.adapter";
import { InternalServerError } from "@/domain/errors";

export class GenerateTokenJwtAdapter
  extends JwtAdapter
  implements GenerateTokenPort
{
  execute(token: GenerateTokenPort.Param): GenerateTokenPort.Response {
    try {
      const accessToken = jwt.sign(token, this.secret, {
        expiresIn: this.accessTokenExpiresIn,
      });
      const refreshToken = jwt.sign(token, this.secret, {
        expiresIn: this.refreshTokenExpiresIn,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return new InternalServerError();
    }
  }
}
