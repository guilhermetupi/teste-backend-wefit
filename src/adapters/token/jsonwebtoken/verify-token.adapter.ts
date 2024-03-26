import { UnauthorizedError } from "@/domain/errors";
import jwt, { JwtPayload } from "jsonwebtoken";
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
      const payload = decoded as JwtPayload;
      delete payload.iat;
      delete payload.exp;
      delete payload.nbf;
      delete payload.jti;

      if (error) {
        response = new UnauthorizedError();
        return;
      }

      response = payload as T;
    });

    return response as VerifyTokenPort.Response<T>;
  }
}
