import { PhoneValidationPort } from "@/ports/validations";
import GooglePhoneUtil from "google-libphonenumber";

export class PhoneGoogleLibphonenumberValidationAdapter
  implements PhoneValidationPort
{
  private readonly phoneUtil = GooglePhoneUtil.PhoneNumberUtil.getInstance();

  validate(phone: string): boolean {
    const number = this.phoneUtil.parseAndKeepRawInput(phone);

    return this.phoneUtil.isValidNumber(number);
  }
}
