import { User } from "@/domain/entities";
import { Email } from "@/domain/value-objects";
import { SigninUseCase } from "@/domain/usecases/auth";
import { CompareCryptographyPort } from "@/ports/cryptography";
import { FindUserByEmailRepositoryPort } from "@/ports/database/repositories/user";
import { GenerateTokenPort } from "@/ports/token";

class FindUserByEmailRepositoryStub implements FindUserByEmailRepositoryPort {
  async execute(
    email: string
  ): Promise<FindUserByEmailRepositoryPort.Response> {
    return new Promise<User>((res) =>
      res({
        email: Email.create(email) as Email,
        password: undefined,
        id: "any_id",
      })
    );
  }
}

class CompareCryptographyAdapterStub implements CompareCryptographyPort {
  execute({ plainText, hashed }: CompareCryptographyPort.Params) {
    return plainText === hashed;
  }
}

class GenerateTokenAdapterStub implements GenerateTokenPort {
  execute({ id }: GenerateTokenPort.Param) {
    return id;
  }
}

export function makeSut() {
  const findUserByEmailRepositoryStub = new FindUserByEmailRepositoryStub();
  const compareCryptographyAdapterStub = new CompareCryptographyAdapterStub();
  const generateTokenAdapterStub = new GenerateTokenAdapterStub();
  const sut = new SigninUseCase(
    findUserByEmailRepositoryStub,
    compareCryptographyAdapterStub,
    generateTokenAdapterStub
  );

  return {
    sut,
    findUserByEmailRepositoryStub,
    compareCryptographyAdapterStub,
    generateTokenAdapterStub,
  };
}
