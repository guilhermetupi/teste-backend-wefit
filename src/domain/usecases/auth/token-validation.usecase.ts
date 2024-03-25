import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { GenerateTokenPort, VerifyTokenPort } from "@/ports/token";
import { TokenValidationUseCasePort } from "@/ports/usecases/auth";

export class TokenValidationUseCase implements TokenValidationUseCasePort {
  constructor(
    private readonly verifyTokenAdapter: VerifyTokenPort,
    private readonly generateTokenAdapter: GenerateTokenPort
  ) {}

  execute(
    token: TokenValidationUseCasePort.Param
  ): TokenValidationUseCasePort.Response {
    const tokenResponse = this.verifyTokenAdapter.execute(token);

    if (tokenResponse instanceof UnauthorizedError) {
      return tokenResponse;
    }

    if (tokenResponse.verified && !tokenResponse.valid) {
      if (!tokenResponse.payload) {
        return new UnauthorizedError();
      }

      const generatedToken = this.generateTokenAdapter.execute(
        tokenResponse.payload
      );

      if (generatedToken instanceof InternalServerError) {
        return new InternalServerError();
      }

      return {
        tokens: generatedToken,
        payload: tokenResponse.payload,
      };
    }

    return {
      payload: tokenResponse.payload as Record<string, any>,
    };
  }
}
