import { InvalidParamError } from "../errors";
import { VendorOrBuyerAddressType } from "../types/entities";

export class VendorOrBuyerAddress {
  constructor(private readonly address: VendorOrBuyerAddressType) {
    Object.freeze(this);
  }

  static create(address: VendorOrBuyerAddressType): VendorOrBuyerAddress {
    const addressIsValid = VendorOrBuyerAddress.isValid(address);

    if (addressIsValid instanceof InvalidParamError) {
      throw addressIsValid;
    }

    return new VendorOrBuyerAddress(address);
  }

  static isValid(address: VendorOrBuyerAddressType): true | InvalidParamError {
    const addressIsDefined = !!address;

    if (!addressIsDefined) {
      return new InvalidParamError("Address is required");
    }

    const addressStreetIsDefined = !!address.street;

    if (!addressStreetIsDefined) {
      return new InvalidParamError("Street is required");
    }

    const addressStreetIsBigEnough = address.street.length >= 3;

    if (!addressStreetIsBigEnough) {
      return new InvalidParamError("Street is too short");
    }

    const addressNeighborhoodIsDefined =
      !!address.neighborhood;

    if (!addressNeighborhoodIsDefined) {
      return new InvalidParamError("Neighborhood is required");
    }

    const addressNeighborhoodIsBigEnough = address.street.length >= 3;

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

    const addressStateIsDefined = !!address.state;

    if (!addressStateIsDefined) {
      return new InvalidParamError("State is required");
    }

    const addressStateIsBigEnough = address.state.length >= 4;

    if (!addressStateIsBigEnough) {
      return new InvalidParamError("State is too short");
    }

    const addressCountryIsDefined = !!address.country;

    if (!addressCountryIsDefined) {
      return new InvalidParamError("Country is required");
    }

    const addressCountryIsBigEnough = address.country.length >= 4;

    if (!addressCountryIsBigEnough) {
      return new InvalidParamError("Country is too short");
    }

    const addressZipCodeIsDefined = !!address.zipCode;

    if (!addressZipCodeIsDefined) {
      return new InvalidParamError("Zip code is required");
    }

    const addressZipCodeIsBigEnough = address.zipCode.length >= 3;

    if (!addressZipCodeIsBigEnough) {
      return new InvalidParamError("Zip code is too short");
    }

    return true;
  }

  get value(): VendorOrBuyerAddressType {
    return this.address;
  }
}
