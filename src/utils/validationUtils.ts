import { isValidNumber } from "libphonenumber-js";
import { countryData } from "@/components/shared/countryData";
import {
  isValidName,
  isValidEmail,
  isValidDigit,
  isValidString,
  isValidPositiveNumber,
  isGreaterThanZero,
  isValidDizzlyDomain,
} from "./validation";

//Name validation
export const validateName = (name: string, inputName: any) => {
  const errors: string[] = [];
  if (!name) {
    errors.push(inputName + " is required");
  } else if (!isValidName(name)) {
    errors.push(inputName + " can only contain Arabic or English letters");
  } else if (name.length < 2) {
    errors.push(inputName + " is too short");
  } else if (name.length > 15) {
    errors.push(inputName + " is too long");
  }
  return errors;
};

//email validation
export const validateEmail = (email: string) => {
  const errors: string[] = [];
  if (!email) {
    errors.push("email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Email is invalid");
  } else if (email.length < 2) {
    errors.push("email is too short");
  } else if (email.length > 50) {
    errors.push("email is too long");
  }
  return errors;
};

export function validatePassword(password: string) {
  const errors: string[] = [];

  if (!password) {
    errors.push("Password is required");
    return errors;
  }

  if (password.length < 6) {
    return "Password is too short. It must be at least 6 characters.";
  }

  if (password.length > 20) {
    return "Password is too long. It must be no more than 20 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must include at least one number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must include at least one special character.";
  }

  if (!/[A-Za-z\u0621-\u064A]/.test(password)) {
    return "Password must include at least one letter.";
  }

  return null;
}

//title validation
export const validateTitle = (title: string, inputName: string) => {
  const errors: string[] = [];
  if (!title) {
    errors.push(inputName + " is required");
  } else if (!isValidName(title)) {
    errors.push(inputName + " can only contain Arabic or English letters");
  } else if (title.length < 2) {
    errors.push(inputName + " is too short");
  } else if (title.length > 30) {
    errors.push(inputName + " is too long");
  }
  return errors;
};

//cost validation
export const validateCost = (digit: any) => {
  const errors: string[] = [];
  if (!digit) {
    errors.push("cost is required");
  } else if (!isValidDigit(digit)) {
    errors.push("cost can only contain numbers");
  }
  return errors;
};

// //Number of Subcategories validation
// export const validateNumber = (digit: any) => {
//   const errors: string[] = []
//   if (!digit) {
//     errors.push('Number of Subcategories is required')
//   } else if (!isValidDigit(digit)) {
//     errors.push('Number of Subcategories can only contain numbers')
//   }
//   return errors
// }

//Time Value validation
export const validateTimeValue = (digit: any) => {
  const errors: string[] = [];
  if (!digit) {
    errors.push("Time Value is required");
  } else if (!isValidDigit(digit)) {
    errors.push("Time Value can only contain numbers");
  }
  return errors;
};

//string validation
export const validateString = (text: any, inputName: any) => {
  const errors: string[] = [];
  if (!text) {
    errors.push(inputName + " is required");
  } else if (!isValidString(text)) {
    errors.push(
      inputName + " can only contain arabic, english letters, _, $ and numbers",
    );
  } else if (text.length < 2) {
    errors.push(inputName + " is too short");
  } else if (text.length > 50) {
    errors.push(inputName + " is too long");
  }
  return errors;
};

//description validation
export const validateDesc = (desc: any, inputName: any) => {
  const errors: string[] = [];
  if (!desc) {
    errors.push(inputName + " is required");
  } else if (!isValidString(desc)) {
    errors.push(
      inputName + " can only contain arabic, english letters, _, $ and numbers",
    );
  } else if (desc.length < 10) {
    errors.push(inputName + " is too short");
  } else if (desc.length > 250) {
    errors.push(inputName + " is too long");
  }
  return errors;
};

//digit validation
export const validateDigits = (digit: any, inputName: string) => {
  const errors: string[] = [];
  if (!digit) {
    errors.push(inputName + " is required");
  } else if (!isValidDigit(digit)) {
    errors.push(inputName + " can only contain numbers");
  }
  return errors;
};

//validate percentage
export const validatePercentage = (percentage: any, inputName: any) => {
  const errors: string[] = [];
  if (!percentage) {
    errors.push(inputName + " is required");
  } else if (percentage < 0) {
    errors.push(inputName + " can be 0 or more");
  } else if (percentage > 100) {
    errors.push(inputName + " can not be greater than 100");
  }
  return errors;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) {
    return "Phone number is required";
  }

  // Check if the phone number starts with a valid country code
  const selectedCountry = countryData.data.find((country) =>
    phone.startsWith(country.key),
  );

  if (!selectedCountry) {
    return "Invalid country code in phone number";
  }

  const { key, phoneNumberAspects } = selectedCountry;
  const phoneWithoutCode = phone.slice(key.length);

  // Validate the phone number's prefix
  const isValidPrefix = phoneNumberAspects.startWith.some((prefix) =>
    phoneWithoutCode.startsWith(prefix),
  );

  if (!isValidPrefix) {
    const prefixList = phoneNumberAspects.startWith.join(", ");
    return `Phone number must start with one of the following: ${prefixList}`;
  }

  // Validate the phone number's length
  if (phoneWithoutCode.length !== phoneNumberAspects.count) {
    return `Phone number must be exactly ${phoneNumberAspects.count} digits long`;
  }

  return null; // No errors
};

export const validateNumber = (num: any, inputName: any) => {
  const errors: string[] = [];
  if (!num) {
    errors.push(inputName + " is required");
  } else if (!isValidNumber(num)) {
    errors.push(inputName + " must be a valid number");
  }
  return errors;
};

export const validatePositiveNumber = (num: any, inputName: any) => {
  const errors: string[] = [];
  if (!num) {
    errors.push(inputName + " is required");
  } else if (!isValidPositiveNumber(num)) {
    errors.push(inputName + " must be a positive number");
  }
  return errors;
};
export const validateGreaterThanZero = (num: any, inputName: any) => {
  const errors: string[] = [];
  if (!num) {
    errors.push(inputName + " is required");
  } else if (!isGreaterThanZero(num)) {
    errors.push(inputName + " must be > 0");
  }
  return errors;
};

export const validateDizzlyDomain = (link: string) => {
  const errors: string[] = [];
  if (!link) {
    errors.push("link is required");
  } else if (!isValidDizzlyDomain(link)) {
    errors.push(
      "link must be a valied URL from dizzly-store.com like https://dizzly-store.com/...",
    );
  } else if (link.length > 200) {
    errors.push("link is too long");
  }
  return errors;
};

// utils.ts
export const handleNumFiledChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setNumFiledInput: React.Dispatch<React.SetStateAction<string>>,
  maxLength: number = 4,
) => {
  const value = e.target.value;
  // Allow only numbers and limit to maxLength
  if (/^\d*$/.test(value) && value.length <= maxLength) {
    setNumFiledInput(value);
  }
};
