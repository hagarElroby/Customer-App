import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import {
  RentalById,
  RentalFeesResponseBody,
  RentalListObject,
  RentalListParams,
} from "@/types/rentals";

export const listRentals = async ({
  productName,
  page,
  limit,
  allowPagination,
  approvalStatus,
  rentalStatus,
  startDate,
  endDate,
  subCategoryId,
  categoryId,
  productType,
  onError,
  onSuccess,
}: RentalListParams & {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<RentalListObject>) => void;
}) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<BodyResponse<RentalListObject>>
    >("/rental/user/list", {
      params: {
        productName,
        page,
        limit,
        allowPagination,
        approvalStatus,
        rentalStatus,
        subCategoryId,
        categoryId,
        productType,
        startDate,
        endDate,
      },
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get rentals list");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getOneRental = async ({
  rentalId,
  onSuccess,
  onError,
}: {
  rentalId: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: RentalById) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<RentalById>>(
      "/rental/user/get",
      {
        params: { rentalId },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get rental data");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
export const getRentalFees = async ({
  rental,
  startDate,
  endDate,
  onSuccess,
  onError,
}: {
  rental: string;
  startDate: string;
  endDate: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: RentalFeesResponseBody) => void;
}) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<RentalFeesResponseBody>
    >("/rental-request/user/get-fee", {
      params: { rental, startDate, endDate },
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get rental fees");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
