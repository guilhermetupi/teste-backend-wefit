import jwt from "jsonwebtoken";
import { GenerateTokenPort } from "@/ports/token";
import { JwtAdapter } from "./jwt.adapter";
import { InternalServerError } from "@/domain/errors";

export class GenerateTokenJwtAdapter
  extends JwtAdapter
  implements GenerateTokenPort
{
  execute(payload: GenerateTokenPort.Param): GenerateTokenPort.Response {
    try {
      const accessToken = jwt.sign(payload, this.secret, {
        expiresIn: this.accessTokenExpiresIn,
      });

      return { accessToken };
    } catch (error) {
      return new InternalServerError();
    }
  }
}
