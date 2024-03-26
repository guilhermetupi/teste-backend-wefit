import { TokenValidationUseCase } from "@/domain/usecases/auth";
import { TokenValidationUseCasePort } from "@/ports/usecases/auth";
import {
  GenerateTokenJwtFactory,
  VerifyTokenJwtFactory,
} from "../../token/jsonwebtoken";

export class TokenValidationUseCaseFactory {
  static create(): TokenValidationUseCasePort {
    const verifyTokenAdapter = VerifyTokenJwtFactory.create();
    const generateTokenAdapter = GenerateTokenJwtFactory.create();

    return new TokenValidationUseCase(verifyTokenAdapter, generateTokenAdapter);
  }
}
