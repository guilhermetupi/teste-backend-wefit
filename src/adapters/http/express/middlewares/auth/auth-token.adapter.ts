import { NextFunction, Response } from "express";
import { MiddlewareHttpPort } from "@/ports/http";
import { ExpressRequest, HttpStatusCode } from "@/types/http";
import { VerifyTokenPort } from "@/ports/token";
import { TokenAuthPayload } from "@/types/token";
import { ErrorType } from "@/types/error";

export class AuthTokenExpressMiddlewareAdapter implements MiddlewareHttpPort {
  constructor(private readonly verifyTokenAdapter: VerifyTokenPort) {}

  async execute(
    req: ExpressRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ")[1];

    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const tokenResponse =
      this.verifyTokenAdapter.execute<TokenAuthPayload>(token);
    const tokenResponseIsError = tokenResponse instanceof Error;

    if (tokenResponseIsError && tokenResponse.name === ErrorType.UNAUTHORIZED) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: tokenResponse.message });
    }

    if (
      tokenResponseIsError &&
      tokenResponse.name === ErrorType.INTERNAL_SERVER
    ) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: tokenResponse.message });
    }

    req.userId = (tokenResponse as TokenAuthPayload).id;

    next();
  }
}
