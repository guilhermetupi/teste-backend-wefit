import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "@/domain/errors";
import { VerifyTokenPort } from "@/ports/token";
import { JwtAdapter } from "./jwt.adapter";

export class VerifyTokenJwtAdapter
  extends JwtAdapter
  implements VerifyTokenPort
{
  execute<T = Record<string, any>>(
    token: VerifyTokenPort.Param
  ): VerifyTokenPort.Response<T> {
    let response: VerifyTokenPort.Response<T> | undefined;

    jwt.verify(token, this.secret, (error, decoded) => {
      if (error) {
        response = new UnauthorizedError();
        return;
      }

      const payload = decoded as JwtPayload;
      delete payload.iat;
      delete payload.exp;
      delete payload.nbf;
      delete payload.jti;

      response = payload as T;
    });

    return response as VerifyTokenPort.Response<T>;
  }
}
