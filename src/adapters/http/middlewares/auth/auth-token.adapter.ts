import { NextFunction, Response } from "express";
import { serialize } from "cookie";
import { Environment } from "@/config/env";
import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { TokenValidationUseCasePort } from "@/ports/usecases/auth";
import { ExpressRequest, HttpStatusCode } from "@/types/http";

export class AuthTokenExpressMiddlewareAdapter {
  constructor(
    private readonly tokenValidationUseCase: TokenValidationUseCasePort
  ) {}

  async execute(
    req: ExpressRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const tokenResponse = this.tokenValidationUseCase.execute(token);

    if (tokenResponse instanceof UnauthorizedError) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: tokenResponse.message });
    }

    if (tokenResponse instanceof InternalServerError) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: tokenResponse.message });
    }

    if (tokenResponse?.tokens) {
      const { accessTokenExpiresIn, refreshTokenExpiresIn } =
        Environment.tokenData;

      const accessTokenSerialized = this.generateSerializedTokenCookie(
        tokenResponse.tokens?.accessToken as string,
        accessTokenExpiresIn,
        "accessToken"
      );
      const refreshTokenSerialized = this.generateSerializedTokenCookie(
        tokenResponse.tokens?.refreshToken as string,
        refreshTokenExpiresIn,
        "refreshToken"
      );

      res.setHeader("Set-Cookie", [
        accessTokenSerialized,
        refreshTokenSerialized,
      ]);
    }

    req.userId = tokenResponse.payload?.id;

    next();
  }

  private generateSerializedTokenCookie(
    token: string,
    expiration: string,
    tokenName: string
  ): string {
    const maxAge = this.convertTokenExpirationToCookieMaxAge(expiration);

    return serialize(tokenName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge,
      path: "/",
    });
  }

  private convertTokenExpirationToCookieMaxAge(expiration: string): number {
    const expirationNumber = Number(expiration.slice(0, -1));
    const expirationType = expiration.slice(-1);

    switch (expirationType) {
      case "s":
        return expirationNumber;
      case "m":
        return expirationNumber * 60;
      case "h":
        return expirationNumber * 60 * 60;
      case "d":
        return expirationNumber * 60 * 60 * 24;
      default:
        return -1;
    }
  }
}
