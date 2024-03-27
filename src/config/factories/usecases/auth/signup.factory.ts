import { SignupUseCase } from "@/domain/usecases/auth";
import { SignupUseCasePort } from "@/ports/usecases/auth";
import { generateTokenJwt } from "../../token/jsonwebtoken";
import { createUserUseCase } from "../user";

class SignupUseCaseFactory {
  static create(): SignupUseCasePort {
    return new SignupUseCase(createUserUseCase, generateTokenJwt);
  }
}

export const signupUseCase = SignupUseCaseFactory.create();
