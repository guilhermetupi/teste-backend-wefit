import { makeSut } from "./mock";

describe("AuthExpressAdapter Route", () => {
  const email = "any_email";
  const password = "any_password";

  describe("POST /auth/signin", () => {
    const req = { body: { email, password } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    it("should call router get with correct params", () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      expect(router.post).toHaveBeenCalledWith("/signin", expect.any(Function));
    });

    it("should call signinPresenter with correct params", async () => {
      const { sut, signinPresenterAdapterStub } = makeSut();
      const signinPresenterStubSpy = jest.spyOn(
        signinPresenterAdapterStub,
        "execute"
      );
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[0][1](req, res);

      expect(signinPresenterStubSpy).toHaveBeenCalledWith({ email, password });
    });

    it("should return the correct response", async () => {
      const { sut, signinPresenterAdapterStub } = makeSut();
      const router = require("express").Router();
      const status = 200;
      const data = { accessToken: "any_token" };
      const message = "any_message";

      jest
        .spyOn(signinPresenterAdapterStub, "execute")
        .mockResolvedValueOnce({ status, data, message });

      sut.setup(router);

      await router.post.mock.calls[0][1](req, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ data, message });
    });
  });

  describe("POST /auth/signup", () => {
    const req = { body: { email, password, passwordConfirmation: password } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    it("should call router get with correct params", () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      expect(router.post).toHaveBeenCalledWith("/signup", expect.any(Function));
    });

    it("should call signupPresenter with correct params", async () => {
      const { sut, signupPresenterAdapterStub } = makeSut();
      const signupPresenterStubSpy = jest.spyOn(
        signupPresenterAdapterStub,
        "execute"
      );
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[1][1](req, res);

      expect(signupPresenterStubSpy).toHaveBeenCalledWith({
        email,
        password,
        passwordConfirmation: password,
      });
    });

    it("should return the correct response", async () => {
      const { sut, signupPresenterAdapterStub } = makeSut();
      const router = require("express").Router();
      const status = 200;
      const data = { accessToken: "any_token" };
      const message = "any_message";

      jest
        .spyOn(signupPresenterAdapterStub, "execute")
        .mockResolvedValueOnce({ status, data, message });

      sut.setup(router);

      await router.post.mock.calls[1][1](req, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ data, message });
    });
  });
});
