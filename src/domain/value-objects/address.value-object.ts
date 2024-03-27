import { InvalidParamError } from "../errors";
import { AddressType } from "@/types/entities";

export class Address {
  constructor(private readonly address: AddressType) {
    Object.freeze(this);
  }

  static create(address: AddressType): Address | InvalidParamError {
    const addressIsValid = Address.isValid(address);

    if (addressIsValid instanceof Error) {
      throw addressIsValid;
    }

    return new Address({ ...address, cep: address.cep.replace(/\D/g, "") });
  }

  static isValid(address: AddressType): true | InvalidParamError {
    const addressIsDefined = !!address;

    if (!addressIsDefined) {
      return new InvalidParamError("Endereço é obrigatório.");
    }

    const addressStreetIsDefined = !!address.street;

    if (!addressStreetIsDefined) {
      return new InvalidParamError("Logradouro é obrigatório.");
    }

    const addressStreetIsBigEnough = address.street.length >= 4;

    if (!addressStreetIsBigEnough) {
      return new InvalidParamError("Logradouro é muito curto.");
    }

    const addressNeighborhoodIsDefined = !!address.neighborhood;

    if (!addressNeighborhoodIsDefined) {
      return new InvalidParamError("Bairro é obrigatório.");
    }

    const addressNeighborhoodIsBigEnough = address.neighborhood.length >= 2;

    if (!addressNeighborhoodIsBigEnough) {
      return new InvalidParamError("Nome do bairro é muito curto.");
    }

    const addressNumberIsDefined =
      !!address.number || address.number.length > 0;

    if (!addressNumberIsDefined) {
      return new InvalidParamError("Número é obrigatório.");
    }

    const addressCityIsDefined = !!address.city || address.city.length > 0;

    if (!addressCityIsDefined) {
      return new InvalidParamError("Cidade é obrigatória.");
    }

    const addressCityIsBigEnough = address.city.length >= 3;

    if (!addressCityIsBigEnough) {
      return new InvalidParamError("Nome da cidade é muito curto.");
    }

    const addressStateIsDefined = !!address.state;

    if (!addressStateIsDefined) {
      return new InvalidParamError("Estado é obrigatório.");
    }

    const addressStateIsBigEnough = address.state.length >= 4;

    if (!addressStateIsBigEnough) {
      return new InvalidParamError("Nome do estado é muito curto.");
    }

    const addressCepIsDefined = !!address.cep;

    if (!addressCepIsDefined) {
      return new InvalidParamError("CEP é obrigatório.");
    }

    const addressCepIsValid = address.cep.replace(/\D/g, "").length === 8;

    if (!addressCepIsValid) {
      return new InvalidParamError("CEP inválido.");
    }

    return true;
  }

  get value(): AddressType {
    return this.address;
  }
}
