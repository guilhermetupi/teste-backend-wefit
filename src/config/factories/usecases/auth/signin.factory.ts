import { SigninUseCase } from "@/domain/usecases/auth";
import { SigninUseCasePort } from "@/ports/usecases/auth";
import { typeOrmFindUserByEmailRepository } from "../../database/orm/repositories/users";
import { bcryptCompareCryptography } from "../../cryptography/bcrypt";
import { generateTokenJwt } from "../../token/jsonwebtoken";

class SigninUseCaseFactory {
  static create(): SigninUseCasePort {
    return new SigninUseCase(
      typeOrmFindUserByEmailRepository,
      bcryptCompareCryptography,
      generateTokenJwt
    );
  }
}

export const signinUseCase = SigninUseCaseFactory.create();
