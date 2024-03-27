import { HttpStatusCode } from "@/types/http";
import { makeSut } from "./mock";
import { InvalidParamError } from "@/domain/errors";

describe("CreateVendorOrBuyerPresenter", () => {
  const userId = "any_user_id";
  const vendorOrBuyer = {
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
  };

  it("should return 401 if userId is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({ vendorOrBuyer } as any);

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.message).toBe("Usuário não autorizado.");
  });

  it("should return 400 if terms are not accepted", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, acceptTerms: false },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe(
      "Você deve aceitar os termos de uso para cadastrar um novo vendedor ou comprador."
    );
  });

  it("should return 400 if personType is legal and cnpj is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, personType: "Pessoa Jurídica" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("CNPJ é obrigatório para pessoa jurídica.");
  });

  it("should return 400 if email is different from emailConfirmation", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, emailConfirmation: "another_email" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe(
      "Email e confirmação de email não correspondem."
    );
  });

  it("should return 400 if use case returns an InvalidParamError", async () => {
    const { sut, createVendorOrBuyerUseCaseStub } = makeSut();
    jest
      .spyOn(createVendorOrBuyerUseCaseStub, "execute")
      .mockResolvedValue(new InvalidParamError("any_message"));

    const response = await sut.execute({ userId, vendorOrBuyer } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("any_message");
  });

  it("should return 400 if PersonType.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, personType: "invalid_person_type" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Tipo de pessoa inválido.");
  });

  it("should return 400 if Name.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, name: "i" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Nome é muito curto.");
  });

  it("should return 400 if Email.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, email: "i", emailConfirmation: "i" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Email inválido.");
  });

  it("should return 400 if Phone.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, mobilePhone: "11" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Número de celular inválido.");
  });

  it("should return 400 if Phone.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, telephone: "11" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Número de telefone fixo inválido.");
  });

  it("should return 400 if Address.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, address: {} },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Endereço é obrigatório.");
  });

  it("should return 400 if Document.create throws", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      userId,
      vendorOrBuyer: { ...vendorOrBuyer, cpf: "123" },
    } as any);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("CPF inválido.");
  });

  it("should return 201 and data if use case returns a valid data", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({ userId, vendorOrBuyer } as any);

    expect(response.status).toBe(HttpStatusCode.CREATED);
    expect(response.data).toBeUndefined();
  });
});
