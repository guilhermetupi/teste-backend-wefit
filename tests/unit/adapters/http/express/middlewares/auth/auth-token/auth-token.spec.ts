import { ExpressRequest } from "@/types/http";
import { makeSut } from "./mock";
import { InternalServerError, UnauthorizedError } from "@/domain/errors";

describe("AuthTokenExpressAdapter Middleware", () => {
  let req: ExpressRequest;
  let res: any;
  const next = jest.fn();

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer any_token",
      },
    } as ExpressRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should call AuthTokenExpressAdapter with correct values", async () => {
    const { sut, verifyTokenAdapterStub } = makeSut();
    const verifyTokenAdapterSpy = jest.spyOn(verifyTokenAdapterStub, "execute");

    await sut.execute(req, res, next);

    expect(verifyTokenAdapterSpy).toHaveBeenCalledWith("any_token");
  });

  it("should return 401 if token is not provided", async () => {
    const { sut } = makeSut();
    const reqWithoutToken = { headers: {} } as ExpressRequest;

    await sut.execute(reqWithoutToken, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 401 if token is invalid", async () => {
    const { sut, verifyTokenAdapterStub } = makeSut();
    jest
      .spyOn(verifyTokenAdapterStub, "execute")
      .mockReturnValueOnce(new UnauthorizedError());

    await sut.execute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário não autorizado.",
    });
  });

  it("should return 500 if verifyTokenAdapter throws", async () => {
    const { sut, verifyTokenAdapterStub } = makeSut();
    jest
      .spyOn(verifyTokenAdapterStub, "execute")
      .mockReturnValueOnce(new InternalServerError());

    await sut.execute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  it("should set userId on req if token is valid", async () => {
    const { sut, verifyTokenAdapterStub } = makeSut();
    jest
      .spyOn(verifyTokenAdapterStub, "execute")
      .mockReturnValueOnce({ id: "valid_id" });

    await sut.execute(req, res, next);

    expect(req.userId).toBe("valid_id");
  });

  it("should call next if token is valid", async () => {
    const { sut, verifyTokenAdapterStub } = makeSut();
    jest
      .spyOn(verifyTokenAdapterStub, "execute")
      .mockReturnValueOnce({ id: "valid_id" });

    await sut.execute(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
