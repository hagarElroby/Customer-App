const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
const emailRegex = /\S+@\S+\.\S+/;
// const phoneRegex = /^\+[1-9]\d{1,14}$/
const titleRegex = /^[a-zA-Z0-9_ ]{3,30}$/;
const stringRegex = /^(?=.*[a-zA-Z\u0621-\u064A])[\w\s$]+$/;

const digitRegex = /^[0-9]+$/;
const numberRegex = /^-?\d+(\.\d+)?$/;
const postiveNumberRegex = /^\d+(\.\d+)?$/;
const greaterThanZero = /^([1-9]\d*|0?\.\d*[1-9]\d*)$/;
const dizzlyDomain = /^https:\/\/dizzly-store\.com\/.*$/;

export function isValidName(name: string) {
  return nameRegex.test(name.trim());
}
export function isValidEmail(email: string) {
  return emailRegex.test(email.trim());
}
// export function isValidPhoneNumber(phoneNumber: string) {
//   return phoneRegex.test(phoneNumber)
// }

export function isValidTitle(title: string) {
  return titleRegex.test(title.trim());
}

export function isValidDigit(digit: any) {
  return digitRegex.test(digit.trim());
}

export function isValidString(str: any) {
  return stringRegex.test(str.trim());
}

export function isValidNumber(num: any) {
  return numberRegex.test(num);
}

export function isValidPositiveNumber(num: any) {
  return postiveNumberRegex.test(num);
}

export function isGreaterThanZero(num: any) {
  return greaterThanZero.test(num);
}

export function isValidDizzlyDomain(link: string) {
  return dizzlyDomain.test(link);
}
