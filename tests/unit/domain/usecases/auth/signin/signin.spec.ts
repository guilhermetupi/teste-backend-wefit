import { UnauthorizedError } from "@/domain/errors";
import { makeSut } from "./mock";

describe("SigninUseCase", () => {
  const email = "email@any.com";
  const password = "Any_p4assword";

  it("should return an UnauthorizedError if user does not exist", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "execute")
      .mockResolvedValue(undefined);

    const response = (await sut.execute({ email, password })) as Error;

    expect(response.message).toBe("Usuário não autorizado.");
  });

  it("should return an InternalServerError if user does not have password", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, "execute").mockResolvedValue({
      email,
      id: "any_id",
    } as any);

    const response = (await sut.execute({ email, password })) as Error;

    expect(response.message).toBe("Internal Server Error");
  });

  it("should return an InternalServerError if user does not have id", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, "execute").mockResolvedValue({
      email,
      password,
    } as any);

    const response = (await sut.execute({ email, password })) as Error;

    expect(response.message).toBe("Internal Server Error");
  });

  it("should return an UnauthorizedError if password is incorrect", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, "execute").mockResolvedValue({
      email,
      password,
      id: "any_id",
    } as any);

    const response = (await sut.execute({
      email,
      password: "incorrect",
    })) as Error;

    expect(response.message).toBe("Usuário não autorizado.");
  });

  it("should return a token if password is correct", async () => {
    const {
      sut,
      findUserByEmailRepositoryStub,
      compareCryptographyAdapterStub,
    } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, "execute").mockResolvedValue({
      email,
      password,
      id: "any_id",
    } as any);
    jest.spyOn(compareCryptographyAdapterStub, "execute").mockReturnValue(true);

    const response = await sut.execute({ email, password });

    expect(response).toBe("any_id");
  });
});
