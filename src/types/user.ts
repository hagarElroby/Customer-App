export interface GeoLocation {
  lat: number;
  lng: number;
}

export type AddressType = "HOME" | "WORK";

export interface Address {
  country?: string;
  zipCode?: number;
  state?: string;
  city?: string;
  streetAddress?: string;
  apartment?: string;
  address2?: string;
  type?: AddressType;
  geoLocation?: GeoLocation;
  isDefault: boolean;
}

export interface IRejectionReasons {
  missingLicenseDocument: boolean;
  invalidLicenseDocument: boolean;
  missingPlaceOfBusiness: boolean;
  invalidIdentityDocument: boolean;
  documentQualityIssue: boolean;
  other: boolean;
  note: string;
}

type VendorStatus =
  | "NOT_COMPLETED"
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "DELETED"
  | "UNDER_REVIEW";

export interface ProfileModel {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: string;
  email?: string;
  phoneNumber: string;
  userStatus?: VendorStatus;
  isEmailVerified?: boolean;
  walletMoney?: number;
  companyName?: string;
  addresses?: Address[];
  rejectReason?: IRejectionReasons | null;
  nationality?: string;
  profilePicture?: string;
  licenseUrl?: string;
  siteLocationUrl?: string;
  nidUrl?: string;
  dateOfBirth?: string;
}

export interface UpdateProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  profilePicture?: string;
  siteLocationUrl?: string;
  licenseUrl?: string;
  nidUrl?: string;
  otp: string;
  companyName?: string;
  dateOfBirth?: string;
  nationality?: string;
  userStatus?: VendorStatus;
}

export type UserLoginResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  password: string;
  isEmailVerifiyed: string;
  walletPoint?: number;
  walletMoney?: number;
  userStatus?: VendorStatus;
  addresses?: Address[];
  rejectReason?: IRejectionReasons | null;
  licenseUrl?: string;
  nidUrl?: string;
  profilePicture?: string;
  siteLocationUrl?: string;
  jwtRefreshToken: string;
  jwtToken: string;
};
