import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { FavoriteProduct } from "@/types/wishlist";
import axiosInstance from "./axios/axiosInstance";
import { ResponseError } from "@/types/error-types";

export const createFavorite = async ({
  productId,
  groupName,
  onSuccess,
  onError,
}: {
  productId: string;
  groupName: string;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.post<BaseResponse<string>>(
      `/favorite/create?productId=${productId}&groupName=${groupName}`,
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to add to wishlist");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const removeFavorite = async ({
  productId,
  groupName,
  onSuccess,
  onError,
}: {
  productId: string;
  groupName: string;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.delete<BaseResponse<string>>(
      `/favorite/remove`,
      {
        params: { productId, groupName },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to remove from wishlist");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const findAllFavorite = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: FavoriteProduct[]) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response =
      await axiosInstance.get<BaseResponse<FavoriteProduct[]>>(
        `/favorite/findAll`,
      );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to fetch wishlist items");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
