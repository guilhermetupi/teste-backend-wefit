import { makeSut } from "./mock";

describe("VendorOrBuyerExpressAdapter Route", () => {
  describe("POST /vendors-or-buyers", () => {
    const req = {
      body: {
        personType: "Pessoa Física",
        name: "Guilherme Tupinamba Duraes",
        cpf: "49947857832",
        email: "guilhermetupinamba@gmail.com",
        emailConfirmation: "guilhermetupinamba@gmail.com",
        mobilePhone: "11 98966-5147",
        telephone: "11 5513-6874",
        address: {
          street: "Rua X",
          neighborhood: "Bairro",
          number: "1",
          city: "Cidade",
          state: "Estado",
          cep: "11909-101",
        },
        acceptTerms: true,
      },
      userId: "any_user_id",
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    it("should call router get with correct params", () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      expect(router.post).toHaveBeenCalledWith(
        "/",
        expect.any(Function),
        expect.any(Function)
      );
    });

    it("should call next after executing the middleware", async () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[0][1](req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should call createVendorOrBuyerPresenter with correct params", async () => {
      const { sut, createVendorOrBuyerPresenterAdapterStub } = makeSut();
      const createVendorOrBuyerPresenterStubSpy = jest.spyOn(
        createVendorOrBuyerPresenterAdapterStub,
        "execute"
      );
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[0][2](req, res);

      expect(createVendorOrBuyerPresenterStubSpy).toHaveBeenCalledWith({
        vendorOrBuyer: req.body,
        userId: req.userId,
      });
    });

    it("should call res.status with correct params", async () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[0][2](req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call res.json with correct params", async () => {
      const { sut } = makeSut();
      const router = require("express").Router();

      sut.setup(router);

      await router.post.mock.calls[0][2](req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: undefined,
        message: undefined,
      });
    });
  });
});
