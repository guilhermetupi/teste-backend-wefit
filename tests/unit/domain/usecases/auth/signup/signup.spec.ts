import {
  InvalidParamError,
  ConflictError,
  InternalServerError,
} from "@/domain/errors";
import { makeSut } from "./mock";

describe("SigninUseCase", () => {
  const user = {} as any;

  it("should return an InvalidParamError if createUserUseCase throws it", async () => {
    const { sut, createUserUseCaseStub } = makeSut();
    jest
      .spyOn(createUserUseCaseStub, "execute")
      .mockResolvedValue(new InvalidParamError("any_message"));

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("any_message");
  });

  it("should return an ConflictError if createUserUseCase throws it", async () => {
    const { sut, createUserUseCaseStub } = makeSut();
    jest
      .spyOn(createUserUseCaseStub, "execute")
      .mockResolvedValue(new ConflictError("any_message"));

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("any_message");
  });

  it("should return an InternalServerError if createUserUseCase throws it", async () => {
    const { sut, createUserUseCaseStub } = makeSut();
    jest
      .spyOn(createUserUseCaseStub, "execute")
      .mockResolvedValue(new InternalServerError());

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("Internal Server Error");
  });

  it("should return a token if createUserUseCase returns an id", async () => {
    const { sut, createUserUseCaseStub } = makeSut();
    jest.spyOn(createUserUseCaseStub, "execute").mockResolvedValue("any_id");

    const response = await sut.execute(user);

    expect(response).toBe("any_id");
  });
});
