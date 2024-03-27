import { User } from "@/domain/entities";
import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { CompareCryptographyPort } from "@/ports/cryptography";
import { FindUserByEmailRepositoryPort } from "@/ports/database/repositories/user";
import { GenerateTokenPort } from "@/ports/token";
import { SigninUseCasePort } from "@/ports/usecases/auth";

export class SigninUseCase implements SigninUseCasePort {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepositoryPort,
    private readonly compareCryptographyAdapter: CompareCryptographyPort,
    private readonly generateTokenAdapter: GenerateTokenPort
  ) {}

  async execute({
    email,
    password,
  }: SigninUseCasePort.Param): Promise<SigninUseCasePort.Response> {
    const user = await this.checkIfUserExists(email);

    const errorOnCheckIfUserExists = user instanceof Error;

    if (errorOnCheckIfUserExists) {
      return user as UnauthorizedError | InternalServerError;
    }

    if (!user.password || !user.id) {
      return new InternalServerError();
    }

    const isPasswordCorrect = this.compareCryptographyAdapter.execute({
      plainText: password,
      hashed: user.password.value as string,
    });

    if (!isPasswordCorrect) {
      return new UnauthorizedError();
    }

    const token = this.generateTokenAdapter.execute({ id: user.id });

    return token;
  }

  private async checkIfUserExists(
    email: string
  ): Promise<User | UnauthorizedError | InternalServerError> {
    const user = await this.findUserByEmailRepository.execute(email);

    if (!user) {
      return new UnauthorizedError();
    }

    return user;
  }
}
