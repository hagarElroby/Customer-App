import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import {
  CreateRentalRequest,
  RentalById,
  RentalListObject,
  RentalListParams,
} from "@/types/rentals";
import axiosInstance from "./axios/axiosInstance";

//TODO:: Check response type for each api
export const createRentalRequests = async ({
  renter,
  rental,
  seller,
  startDate,
  endDate,
  onError,
  onSuccess,
}: CreateRentalRequest & {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<RentalListObject>) => void;
}) => {
  try {
    const response = await axiosInstance.post<
      BaseResponse<BodyResponse<RentalListObject>>
    >("/rental-request/user/create", {
      rental,
      renter,
      seller,
      startDate,
      endDate,
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to create rental request");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const payRentalFees = async ({
  requestId,
  rentalId,
  paymentMethod,
  onError,
  onSuccess,
}: {
  requestId: string;
  rentalId: string;
  paymentMethod: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<RentalListObject>) => void;
}) => {
  try {
    const response = await axiosInstance.post<
      BaseResponse<BodyResponse<RentalListObject>>
    >("/rental-request/user/checkout", {
      requestId,
      rentalId,
      paymentMethod,
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to pay fees");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getOneRentalRequest = async ({
  requestId,
  onSuccess,
  onError,
}: {
  requestId: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: RentalById) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<RentalById>>(
      "/rental-request/user/get",
      {
        params: { requestId },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get rental requests");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const listRentalRequests = async ({
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
    >("/rental-request/user/list", {
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

export const cancelRentalRequest = async ({
  requestId,
  onError,
  onSuccess,
}: {
  requestId: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: string) => void;
}) => {
  try {
    const response = await axiosInstance.delete<BaseResponse<string>>(
      "/rental-request/user/cancel",
      {
        params: {
          requestId,
        },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to cancel rental request");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
