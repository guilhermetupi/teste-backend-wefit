import { Repository } from "typeorm";
import { makeSut } from "./mock";
import { VendorOrBuyerMapper } from "@/adapters/database/orm/repositories/mappers";
import { AppDataSource } from "@/config/orm";
import { InternalServerError } from "@/domain/errors";
import { PersonTypeEnum } from "@/types/entities";
import { VendorOrBuyer } from "@/domain/entities";
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

describe("FindVendorOrBuyerByUserIdAndDocumentsRepository Typeorm", () => {
  let vendorsAndBuyersRepository: Repository<VendorsAndBuyersModel>;
  let userId: string;
  let vendorOrBuyerModel: VendorsAndBuyersModel;
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
    vendorOrBuyerModel = await vendorsAndBuyersRepository.save({
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
      userId,
    });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should call VendorOrBuyerMapper.toEntity with correct values", async () => {
    const { sut } = makeSut();
    const toPersistenceSpy = jest.spyOn(VendorOrBuyerMapper, "toEntity");

    await sut.execute({
      userId,
      document: vendorOrBuyerModel.cpf,
    });

    expect(toPersistenceSpy).toHaveBeenCalledWith(vendorOrBuyerModel);
  });

  it("should call repository.findOne with correct values", async () => {
    const { sut } = makeSut();
    const saveSpy = jest.spyOn(vendorsAndBuyersRepository, "findOne");

    await sut.execute({
      userId,
      document: vendorOrBuyerModel.cpf,
    });

    expect(saveSpy).toHaveBeenCalledWith({
      where: [
        {
          userId,
          cnpj: vendorOrBuyerModel.cpf,
        },
        {
          userId,
          cpf: vendorOrBuyerModel.cpf,
        },
      ],
    });
  });

  it("should return InternalServerError if repository.save throws", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(vendorsAndBuyersRepository, "findOne")
      .mockRejectedValueOnce(new Error());

    const result = await sut.execute({
      userId,
      document: vendorOrBuyerModel.cpf,
    });

    expect(result).toEqual(new InternalServerError());
  });

  it("should return undefined if repository.findOne returns null", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(vendorsAndBuyersRepository, "findOne")
      .mockResolvedValueOnce(null);

    const result = await sut.execute({
      userId,
      document: vendorOrBuyerModel.cpf,
    });

    expect(result).toBeUndefined();
  });

  it("should return a VendorOrBuyer entity if repository.findOne returns a VendorOrBuyerModel", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      userId,
      document: vendorOrBuyerModel.cpf,
    });

    expect(result).toEqual(vendorOrBuyerEntity);
  });
});
