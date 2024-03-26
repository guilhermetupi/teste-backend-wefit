import { SignupUseCase } from "@/domain/usecases/auth";
import { SignupUseCasePort } from "@/ports/usecases/auth";
import { GenerateTokenJwtFactory } from "../../token/jsonwebtoken";
import { CreateUserUseCaseFactory } from "../user";

export class SignupUseCaseFactory {
  static create(): SignupUseCasePort {
    const generateTokenAdapter = GenerateTokenJwtFactory.create();
    const createUserUseCase = CreateUserUseCaseFactory.create();

    return new SignupUseCase(createUserUseCase, generateTokenAdapter);
  }
}
