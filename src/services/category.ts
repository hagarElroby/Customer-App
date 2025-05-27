import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import { Category, SubCategory, SubCategoryBody } from "@/types/category";

interface GetCategoriesParams {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<Category>) => void;
  name?: string;
  isActive?: boolean;
  categoryId?: string;
  isHoldSubCategory?: boolean;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
}
interface GetSubcategoriesParams {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: SubCategoryBody) => void;
  name?: string;
  isActive?: boolean;
  categoryId?: string;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
}

export const getCategories = async ({
  onError,
  onSuccess,
  ...params
}: GetCategoriesParams) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<BodyResponse<Category>>
    >("/category/Get-Categories", { params });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get categories");
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
export const getSubcategoriesHavingProducts = async ({
  onError,
  onSuccess,
  ...params
}: GetSubcategoriesParams) => {
  try {
    const response = await axiosInstance.get<BaseResponse<SubCategoryBody>>(
      "/sub-category/sub-categories-having-product",
      { params },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get sub categories");
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
