import { makeSut } from "./mock";
import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { HttpStatusCode } from "@/types/http";

describe("SigninPresenter", () => {
  const data = {
    email: "any_email",
    password: "any_password",
  };

  it("should return error 500 if use case returns an InternalServerError", async () => {
    const { sut, signinUseCaseStub } = makeSut();
    jest
      .spyOn(signinUseCaseStub, "execute")
      .mockResolvedValue(new InternalServerError());

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(response.message).toBe("Internal Server Error");
  });

  it("should return error 401 if use case returns an UnauthorizedError", async () => {
    const { sut, signinUseCaseStub } = makeSut();
    jest
      .spyOn(signinUseCaseStub, "execute")
      .mockResolvedValue(new UnauthorizedError());

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.message).toBe("Usuário não autorizado.");
  });

  it("should return status 200 and data if use case returns a valid data", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.data).toEqual({ accessToken: "any_token" });
  });
});
