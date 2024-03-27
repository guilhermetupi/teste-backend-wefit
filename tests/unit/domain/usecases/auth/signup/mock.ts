import { SignupUseCase } from "@/domain/usecases/auth";
import { GenerateTokenPort } from "@/ports/token";
import { CreateUserUseCasePort } from "@/ports/usecases/user";

class CreateUserUseCaseStub implements CreateUserUseCasePort {
  async execute(): Promise<CreateUserUseCasePort.Response> {
    return "any_id";
  }
}

class GenerateTokenAdapterStub implements GenerateTokenPort {
  execute({ id }: GenerateTokenPort.Param) {
    return id;
  }
}

export function makeSut() {
  const createUserUseCaseStub = new CreateUserUseCaseStub();
  const generateTokenAdapterStub = new GenerateTokenAdapterStub();
  const sut = new SignupUseCase(createUserUseCaseStub, generateTokenAdapterStub);

  return {
    sut,
    createUserUseCaseStub,
    generateTokenAdapterStub,
  };
}
