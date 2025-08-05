import { ApprovalStatus, Seller } from "./auction";
import { RejectionReasonObj, SubCategory } from "./global";
import { Flags, ProductType } from "./product";

export type RentalStatus = "PENDING" | "ACTIVE" | "ENDED" | "CANCELLED";

export type RentalListParams = {
  page?: number;
  limit?: number;
  allowPagination?: boolean;
  startDate?: string;
  endDate?: string;
  productType?: ProductType;
  subCategoryId?: string;
  categoryId?: string;
  approvalStatus?: ApprovalStatus;
  rentalStatus?: RentalStatus;
  productName?: string;
};

export type RentalUserData = {
  firstName: string;
  lastName: string;
};

export type CurrentlyRentedSlots = {
  startDate: string;
  endDate: string;
  rentedBy: RentalUserData;
};

export type RentalDetails = {
  startDate: string;
  endDate: string;
  minimumRentalPeriodInDays: number;
  maximumRentalPeriodInDays: number;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  securityDeposit: number;
  currentlyRentedSlots: CurrentlyRentedSlots[];
};

export type RentalListObject = {
  _id: string;
  productName: string;
  productDescription: string[];
  productType: ProductType;
  flags: Flags[];
  tags: string[];
  media: {
    productCover: string;
    productVideo: string;
    productImages: string[];
  };
  subCategory: SubCategory;
  categoryId: string;
  seller: Seller;
  isActive: boolean;
  rentalStatus: RentalStatus;
  approvalStatus: ApprovalStatus;
  productProperties: {
    key: string;
    values: string[];
  }[];
  shipping: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  rentalDetails: RentalDetails;
  hasRenters: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rejectionReasons: RejectionReasonObj[];
};
export type RentalById = {
  _id: string;
  productName: string;
  productDescription: string[];
  productType: ProductType;
  flags: Flags[];
  tags: string[];
  media: {
    productCover: string;
    productVideo: string;
    productImages: string[];
  };
  subCategory: SubCategory;
  categoryId: string;
  seller: Seller;
  isActive: boolean;
  rentalStatus: RentalStatus;
  approvalStatus: ApprovalStatus;
  productProperties: {
    propertyId: string;
    propertyName: string;
    unitId: string;
    unitName: string;
    propertyValue: {
      valueIds: string;
      valueName: string;
    }[];
  }[];
  shipping: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  rentalDetails: RentalDetails;
  hasRenters: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CreateRentalRequest = {
  renter: string;
  rental: string;
  seller: string;
  startDate: Date;
  endDate: Date;
};
