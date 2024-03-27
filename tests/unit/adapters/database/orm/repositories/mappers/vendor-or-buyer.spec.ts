import { VendorsAndBuyersModel } from "@/adapters/database/orm/models";
import { VendorOrBuyerMapper } from "@/adapters/database/orm/repositories/mappers";
import { VendorOrBuyer } from "@/domain/entities";
import { InvalidParamError } from "@/domain/errors";
import {
  Name,
  Address,
  Document,
  Email,
  PersonType,
  Phone,
} from "@/domain/value-objects";
import { PersonTypeEnum } from "@/types/entities";

describe("VendorOrBuyerMapper", () => {
  let userId = "any_id";
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
    id: userId,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  } as VendorsAndBuyersModel;

  describe("toEntity", () => {
    it("should return an VendorOrBuyer on success", () => {
      const vendorOrBuyer = VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);

      expect(vendorOrBuyer).toEqual(vendorOrBuyerEntity);
    });

    it("should call PersonType.create with correct values", () => {
      const createSpy = jest.spyOn(PersonType, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);
      expect(createSpy).toHaveBeenCalledWith(PersonTypeEnum.LEGAL);
    });

    it("should call Document.create with correct values", () => {
      const createSpy = jest.spyOn(Document, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);

      expect(createSpy).toHaveBeenCalledTimes(2);
      expect(createSpy).toHaveBeenNthCalledWith(1, {
        document: "11111111111111",
        required: false,
        isCpf: false,
      });
      expect(createSpy).toHaveBeenNthCalledWith(2, {
        document: "11111111111",
      });
    });

    it("should call Email.create with correct values", () => {
      const createSpy = jest.spyOn(Email, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);
      expect(createSpy).toHaveBeenCalledWith("any@email.com");
    });

    it("should call Phone.create with correct values", () => {
      const createSpy = jest.spyOn(Phone, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);
      expect(createSpy).toHaveBeenCalledTimes(2);
      expect(createSpy).toHaveBeenNthCalledWith(1, "11911111111");
      expect(createSpy).toHaveBeenNthCalledWith(2, "1111111111", false);
    });

    it("should call Address.create with correct values", () => {
      const createSpy = jest.spyOn(Address, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);
      expect(createSpy).toHaveBeenCalledWith({
        street: "Rua X",
        neighborhood: "Bairro",
        number: "1",
        city: "Cidade",
        state: "Estado",
        cep: "11909101",
        complement: "Complemento",
      });
    });

    it("should call Name.create with correct values", () => {
      const createSpy = jest.spyOn(Name, "create");
      VendorOrBuyerMapper.toEntity(vendorOrBuyerModel);
      expect(createSpy).toHaveBeenCalledWith("any_name");
    });

    it("should throw if personType is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidPersonType = {
          ...vendorOrBuyerModel,
          personType: "any_person_type",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidPersonType);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Tipo de pessoa inválido."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Tipo de pessoa inválido.')"
      );
    });

    it("should throw if cnpj is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidCnpj = {
          ...vendorOrBuyerModel,
          cnpj: "any_cnpj",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidCnpj);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("CNPJ inválido."));
        return;
      }

      throw new Error("Should throw an InvalidParamError('CNPJ inválido.')");
    });

    it("should throw if cpf is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidCpf = {
          ...vendorOrBuyerModel,
          cpf: "any_cpf",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidCpf);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("CPF inválido."));
        return;
      }

      throw new Error("Should throw an InvalidParamError('CPF inválido.')");
    });

    it("should throw if mobilePhone is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidMobilePhone = {
          ...vendorOrBuyerModel,
          mobilePhone: "any_mobile_phone",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidMobilePhone);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Número de celular inválido."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Número de celular inválido.')"
      );
    });

    it("should throw if telephone is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidTelephone = {
          ...vendorOrBuyerModel,
          telephone: "any_telephone",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidTelephone);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Número de telefone fixo inválido.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Número de telefone fixo inválido.')"
      );
    });

    it("should throw if email is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidEmail = {
          ...vendorOrBuyerModel,
          email: "any_email",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidEmail);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Email inválido."));
        return;
      }

      throw new Error("Should throw an InvalidParamError('E-mail inválido.')");
    });

    it("should throw if name is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidName = {
          ...vendorOrBuyerModel,
          name: "na",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidName);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Nome é muito curto."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Nome é muito curto.')"
      );
    });

    it("should throw if cep is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidCep = {
          ...vendorOrBuyerModel,
          cep: "any_cep",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidCep);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("CEP inválido."));
        return;
      }

      throw new Error("Should throw an InvalidParamError('CEP inválido.')");
    });

    it("should throw if street is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidStreet = {
          ...vendorOrBuyerModel,
          street: "st",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidStreet);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Logradouro é muito curto."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Logradouro é muito curto.')"
      );
    });

    it("should throw if neighborhood is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidNeighborhood = {
          ...vendorOrBuyerModel,
          neighborhood: "n",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNeighborhood);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Nome do bairro é muito curto.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Nome do bairro é muito curto.')"
      );
    });

    it("should throw if number is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidNumber = {
          ...vendorOrBuyerModel,
          number: "",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNumber);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Número é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Número é obrigatório.')"
      );
    });

    it("should throw if city is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidCity = {
          ...vendorOrBuyerModel,
          city: "ci",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidCity);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Nome da cidade é muito curto.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Nome da cidade é muito curto.')"
      );
    });

    it("should throw if state is invalid", () => {
      try {
        const vendorOrBuyerModelWithInvalidState = {
          ...vendorOrBuyerModel,
          state: "st",
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidState);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Nome do estado é muito curto.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Nome do estado é muito curto.')"
      );
    });

    it("should throw if name is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidName = {
          ...vendorOrBuyerModel,
          name: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidName);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Nome é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Nome é obrigatório.')"
      );
    });

    it("should throw if address is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidAddress = {
          ...vendorOrBuyerModel,
          street: undefined,
          neighborhood: undefined,
          number: undefined,
          city: undefined,
          state: undefined,
          complement: undefined,
          cep: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidAddress);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Endereço é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Endereço é obrigatório.')"
      );
    });

    it("should throw if address street is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidStreet = {
          ...vendorOrBuyerModel,
          street: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidStreet);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Logradouro é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Logradouro é obrigatório.')"
      );
    });

    it("should throw if address neighborhood is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidNeighborhood = {
          ...vendorOrBuyerModel,
          neighborhood: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNeighborhood);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Bairro é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Bairro é obrigatório.')"
      );
    });

    it("should throw if city is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidNumber = {
          ...vendorOrBuyerModel,
          city: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNumber);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Cidade é obrigatória."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Cidade é obrigatória.')"
      );
    });

    it("should throw if state is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidNumber = {
          ...vendorOrBuyerModel,
          state: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNumber);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Estado é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Estado é obrigatório.')"
      );
    });

    it("should throw if cep is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidNumber = {
          ...vendorOrBuyerModel,
          cep: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidNumber);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("CEP é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('CEP é obrigatório.')"
      );
    });

    it("should throw if personType is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidPersonType = {
          ...vendorOrBuyerModel,
          personType: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidPersonType);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Tipo de pessoa inválido."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Tipo de pessoa inválido.')"
      );
    });

    it("should throw if cpf is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidCnpj = {
          ...vendorOrBuyerModel,
          cpf: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidCnpj);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("CPF é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('CPF é obrigatório.')"
      );
    });

    it("should throw if email is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidEmail = {
          ...vendorOrBuyerModel,
          email: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidEmail);
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Email é obrigatório."));
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Email é obrigatório.')"
      );
    });

    it("should throw if mobilePhone is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidMobilePhone = {
          ...vendorOrBuyerModel,
          mobilePhone: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidMobilePhone);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Número de celular é obrigatório.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Número de celular é obrigatório.')"
      );
    });

    it("should throw if telephone is not defined", () => {
      try {
        const vendorOrBuyerModelWithInvalidTelephone = {
          ...vendorOrBuyerModel,
          telephone: undefined,
        } as any;
        VendorOrBuyerMapper.toEntity(vendorOrBuyerModelWithInvalidTelephone);
      } catch (e) {
        expect(e).toEqual(
          new InvalidParamError("Número de telefone fixo é obrigatório.")
        );
        return;
      }

      throw new Error(
        "Should throw an InvalidParamError('Número de telefone fixo é obrigatório.')"
      );
    });
  });

  describe("toPersistence", () => {
    it("should return an VendorOrBuyerModel on success", () => {
      const vendorOrBuyerModel = VendorOrBuyerMapper.toPersistence(
        userId,
        vendorOrBuyerEntity
      );

      expect(vendorOrBuyerModel).toEqual(vendorOrBuyerModel);
    });
  });
});
