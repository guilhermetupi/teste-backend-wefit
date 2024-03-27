import jwt from "jsonwebtoken";
import { makeSut } from "./mock";
import { UnauthorizedError } from "@/domain/errors";

jest.mock("@/config/env", () => ({
  Environment: {
    tokenData: {
      secret: "any_secret",
      accessTokenExpiresIn: "1d",
    },
  },
}));

describe("VerifyTokenAdapter JWT", () => {
  const token = "any_token";

  it("should call verify with correct values", () => {
    const verifySpy = jest.spyOn(jwt, "verify");
    const { sut } = makeSut();

    sut.execute(token);

    expect(verifySpy).toHaveBeenCalledWith(
      token,
      "any_secret",
      expect.any(Function)
    );
  });

  it("should return a payload on success", () => {
    const { sut } = makeSut();
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((token, secret, cb: any) => {
        cb(null, { id: "any_id" });
      });

    const response = sut.execute(token) as { id: string };

    expect(response.id).toBe("any_id");
  });

  it("should return an UnauthorizedError on verify throws", () => {
    const { sut } = makeSut();
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((token, secret, cb: any) => {
        cb(true, null);
      });

    const response = sut.execute(token) as UnauthorizedError;

    expect(response.message).toBe("Usuário não autorizado.");
  });
});
