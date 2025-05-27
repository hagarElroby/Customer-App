import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { Banner } from "@/types/banner";

export const getBanners = async ({
  name,
  isActive,
  page,
  limit,
  allowPagination,
  onSuccess,
  onError,
}: {
  name?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<Banner>) => void;
}) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<BodyResponse<Banner>>
    >("/banners/get-all", {
      params: { title: name, isActive, page, limit, allowPagination },
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get banners");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
