import { Repository } from "typeorm";
import { makeSut } from "./mock";
import { VendorOrBuyerMapper } from "@/adapters/database/orm/repositories/mappers";
import { AppDataSource } from "@/config/orm";
import { VendorOrBuyer } from "@/domain/entities";
import { PersonTypeEnum } from "@/types/entities";
import { InternalServerError } from "@/domain/errors";
import {
  UsersModel,
  VendorsAndBuyersModel,
} from "@/adapters/database/orm/models";
import {
  Address,
  Document,
  Email,
  Name,
  PersonType,
  Phone,
} from "@/domain/value-objects";

describe("CreateVendorOrBuyerRepository Typeorm", () => {
  let vendorsAndBuyersRepository: Repository<VendorsAndBuyersModel>;
  let userId: string;
  let vendorOrBuyerEntity: VendorOrBuyer = {
    name: Name.create("any_name") as Name,
    address: Address.create({
      street: "Rua X",
      neighborhood: "Bairro",
      number: "1",
      city: "Cidade",
      state: "Estado",
      cep: "11909-101",
      complement: "Complemento",
    }) as Address,
    cnpj: Document.create({
      document: "11.111.111/1111-11",
      required: false,
      isCpf: false,
    }) as Document,
    cpf: Document.create({
      document: "111.111.111-11",
    }) as Document,
    email: Email.create("any@email.com") as Email,
    mobilePhone: Phone.create("(11) 91111-1111") as Phone,
    personType: PersonType.create("Pessoa Jurídica") as PersonType,
    telephone: Phone.create("(11) 1111-1111", false) as Phone,
  };
  let vendorOrBuyerModel = {
    id: expect.any(String),
    name: "any_name",
    street: "Rua X",
    neighborhood: "Bairro",
    number: "1",
    complement: "Complemento",
    city: "Cidade",
    state: "Estado",
    cep: "11909101",
    cnpj: "11111111111111",
    cpf: "11111111111",
    email: "any@email.com",
    mobilePhone: "11911111111",
    personType: PersonTypeEnum.LEGAL,
    telephone: "1111111111",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  } as VendorsAndBuyersModel;

  beforeAll(async () => {
    await AppDataSource.initialize();
    vendorsAndBuyersRepository = AppDataSource.getRepository(
      VendorsAndBuyersModel
    );

    const { id } = await AppDataSource.getRepository(UsersModel).save({
      email: "any_email",
      password: "any_password",
    });
    userId = id as string;
    vendorOrBuyerModel.userId = userId;
  });

  beforeEach(async () => {
    await vendorsAndBuyersRepository.clear();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should call VendorOrBuyerMapper.toPersistence with correct values", async () => {
    const { sut } = makeSut();
    const toPersistenceSpy = jest.spyOn(VendorOrBuyerMapper, "toPersistence");

    await sut.execute({
      userId,
      vendorOrBuyer: vendorOrBuyerEntity,
    });

    expect(toPersistenceSpy).toHaveBeenCalledWith(userId, vendorOrBuyerEntity);
  });

  it("should call repository.save with correct values", async () => {
    const { sut } = makeSut();
    const saveSpy = jest.spyOn(vendorsAndBuyersRepository, "save");

    await sut.execute({
      userId,
      vendorOrBuyer: vendorOrBuyerEntity,
    });

    expect(saveSpy).toHaveBeenCalledWith(vendorOrBuyerModel);
  });

  it("should return InternalServerError if repository.save throws", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(vendorsAndBuyersRepository, "save")
      .mockRejectedValueOnce(new Error());

    const result = await sut.execute({
      userId,
      vendorOrBuyer: vendorOrBuyerEntity,
    });

    expect(result).toEqual(new InternalServerError());
  });
});
