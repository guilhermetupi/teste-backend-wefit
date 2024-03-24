import { InvalidParamError } from "../errors";
import { AddressType } from "@/types/entities";

export class Address {
  constructor(private readonly address: AddressType) {
    Object.freeze(this);
  }

  static create(address: AddressType): Address {
    const addressIsValid = Address.isValid(address);

    if (addressIsValid instanceof InvalidParamError) {
      throw addressIsValid;
    }

    return new Address(address);
  }

  static isValid(address: AddressType): true | InvalidParamError {
    const addressIsDefined = !!address;

    if (!addressIsDefined) {
      return new InvalidParamError("Address is required");
    }

    const addressStreetIsDefined = !!address.street;

    if (!addressStreetIsDefined) {
      return new InvalidParamError("Street is required");
    }

    const addressStreetIsBigEnough = address.street.length >= 4;

    if (!addressStreetIsBigEnough) {
      return new InvalidParamError("Street is too short");
    }

    const addressNeighborhoodIsDefined =
      !!address.neighborhood;

    if (!addressNeighborhoodIsDefined) {
      return new InvalidParamError("Neighborhood is required");
    }

    const addressNeighborhoodIsBigEnough = address.neighborhood.length >= 2;

    if (!addressNeighborhoodIsBigEnough) {
      return new InvalidParamError("Neighborhood is too short");
    }

    const addressNumberIsDefined =
      !!address.number || address.number.length > 0;

    if (!addressNumberIsDefined) {
      return new InvalidParamError("Number is required");
    }

    const addressCityIsDefined = !!address.city || address.city.length > 0;

    if (!addressCityIsDefined) {
      return new InvalidParamError("City is required");
    }

    const addressCityIsBigEnough = address.city.length >= 3;

    if (!addressCityIsBigEnough) {
      return new InvalidParamError("City is too short");
    }

    const addressStateIsDefined = !!address.state;

    if (!addressStateIsDefined) {
      return new InvalidParamError("State is required");
    }

    const addressStateIsBigEnough = address.state.length >= 4;

    if (!addressStateIsBigEnough) {
      return new InvalidParamError("State is too short");
    }

    const addressCepIsDefined = !!address.cep;

    if (!addressCepIsDefined) {
      return new InvalidParamError("Zip code is required");
    }

    const addressCepIsInvalid = !/^\d{5}-\d{3}$/.test(address.cep);

    if (!addressCepIsInvalid) {
      return new InvalidParamError("Zip code is invalid");
    }

    return true;
  }

  get value(): AddressType {
    return this.address;
  }
}
