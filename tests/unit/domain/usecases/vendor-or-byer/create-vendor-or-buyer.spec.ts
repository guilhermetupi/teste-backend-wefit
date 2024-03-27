import {
  Document,
  Email,
  Name,
  Phone,
  Address,
  PersonType,
} from "@/domain/value-objects";
import { makeSut } from "./mock";
import { PersonTypeEnum } from "@/types/entities";

describe("CreateVendorOrBuyerUseCase", () => {
  const userId = "any_id";
  const vendorOrBuyer = {
    email: Email.create("any@email.com") as Email,
    cpf: Document.create({ document: "11111111111" }) as Document,
    name: Name.create("any_name") as Name,
    mobilePhone: Phone.create("5511999999999") as Phone,
    telephone: Phone.create("5511888888888") as Phone,
    address: Address.create({
      cep: "00000000",
      city: "any_city",
      neighborhood: "any_neighborhood",
      number: "any_number",
      state: "any_state",
      street: "any_street",
    }) as Address,
    personType: PersonType.create(PersonTypeEnum.LEGAL),
  } as any;

  it("should return a NotFoundError if user does not exist", async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByIdRepositoryStub, "execute")
      .mockResolvedValue(undefined);

    const response = (await sut.execute({ userId, vendorOrBuyer })) as Error;

    expect(response.message).toBe("Usuário não encontrado.");
  });

  it("should return a ConflictError if vendor or buyer already exists", async () => {
    const { sut, findVendorOrBuyerByUserIdAndDocumentsRepositoryStub } =
      makeSut();
    jest
      .spyOn(findVendorOrBuyerByUserIdAndDocumentsRepositoryStub, "execute")
      .mockResolvedValue({} as any);

    const response = (await sut.execute({ userId, vendorOrBuyer })) as Error;

    expect(response.message).toBe("Vendedor ou comprador já cadastrado.");
  });

  it("should return an InternalError if createVendorOrBuyerRepository throws an error", async () => {
    const { sut, createVendorOrBuyerRepositoryStub } = makeSut();
    jest
      .spyOn(createVendorOrBuyerRepositoryStub, "execute")
      .mockResolvedValue(new Error());

    const response = await sut.execute({ userId, vendorOrBuyer });

    expect(response).toBeInstanceOf(Error);
  });

  it("should call findUserByIdRepository with correct params", async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    const executeSpy = jest.spyOn(findUserByIdRepositoryStub, "execute");

    await sut.execute({ userId, vendorOrBuyer });

    expect(executeSpy).toHaveBeenCalledWith(userId);
  });

  it("should call findVendorOrBuyerByUserIdAndDocumentsRepository with correct params", async () => {
    const { sut, findVendorOrBuyerByUserIdAndDocumentsRepositoryStub } =
      makeSut();
    const executeSpy = jest.spyOn(
      findVendorOrBuyerByUserIdAndDocumentsRepositoryStub,
      "execute"
    );

    await sut.execute({ userId, vendorOrBuyer });

    expect(executeSpy).toHaveBeenCalledWith({
      userId,
      document: vendorOrBuyer.cpf.value,
    });
  });

  it("should call createVendorOrBuyerRepository with correct params", async () => {
    const { sut, createVendorOrBuyerRepositoryStub } = makeSut();
    const executeSpy = jest.spyOn(createVendorOrBuyerRepositoryStub, "execute");

    await sut.execute({ userId, vendorOrBuyer });

    expect(executeSpy).toHaveBeenCalledWith({
      userId,
      vendorOrBuyer,
    });
  });
});
