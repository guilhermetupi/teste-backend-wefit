import { NextFunction, Response } from "express";
import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { MiddlewareHttpPort } from "@/ports/http";
import { ExpressRequest, HttpStatusCode } from "@/types/http";
import { VerifyTokenPort } from "@/ports/token";

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
      console.log(HttpStatusCode.UNAUTHORIZED, 26);
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const tokenResponse = this.verifyTokenAdapter.execute<{ id: string }>(
      token
    );

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

    req.userId = tokenResponse.id;

    next();
  }
}
