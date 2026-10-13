import { DEFAULT_COUNTRY_CODE } from "../data/countryCodes.js";

export const PHONE_DIGITS_MIN = 6;
export const PHONE_DIGITS_MAX = 15;

export const getPhoneDigits = (value = "") => value.replace(/\D/g, "");

export const buildFullPhoneNumber = (countryCode, phoneNumber) => {
  const dial = (countryCode || DEFAULT_COUNTRY_CODE).trim();
  const digits = getPhoneDigits(phoneNumber);
  if (!digits) return dial;
  return `${dial}${digits}`;
};

export const validatePhoneFields = (countryCode, phoneNumber) => {
  if (!countryCode) return "Please select a country code.";
  if (!phoneNumber?.trim()) return "Please enter your contact number.";

  const digits = getPhoneDigits(phoneNumber);
  if (digits.length < PHONE_DIGITS_MIN || digits.length > PHONE_DIGITS_MAX) {
    return "Please enter a valid contact number.";
  }

  return "";
};
