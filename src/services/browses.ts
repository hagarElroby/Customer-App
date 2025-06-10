import axiosInstance from "./axios/axiosInstance";
import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import { AllProductsDocs } from "@/types/product";

export const getPreviouslyBrowsed = async ({
  onError,
  onSuccess,
  page,
  limit,
  allowPagination,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<AllProductsDocs>) => void;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
}) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<BodyResponse<AllProductsDocs>>
    >("/browses/get-all", {
      params: {
        page,
        limit,
        allowPagination,
      },
    });

    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get browse data");
    }
  } catch (error) {
    const typedError = error as { response?: { data: ResponseError } };
    if (typedError.response?.data) {
      onError?.(typedError.response.data);
    } else {
      onError?.({ description: "An unexpected error occurred" });
    }
    return null;
  }
};
