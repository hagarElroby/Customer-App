import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { CartBodyResponse } from "@/types/cart";
import axiosInstance from "./axios/axiosInstance";
import { ResponseError } from "@/types/error-types";

export const addCart = async ({
  productId,
  groupName,
  quantity,
  onSuccess,
  onError,
}: {
  productId: string;
  groupName: string;
  quantity: number;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.post<BaseResponse<string>>(
      `/cart/add`,
      { productId, groupName, quantity },
    );

    const { status, body } = response.data;

    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to add to cart");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const removeCart = async ({
  cartId,
  productId,
  groupName,
  quantityToBeRemoved,
  onSuccess,
  onError,
}: {
  cartId: string;
  productId: string;
  groupName: string;
  quantityToBeRemoved: number;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.delete<BaseResponse<string>>(
      `/cart/remove?cartId=${cartId}`,
      {
        data: {
          productId,
          groupName,
          quantityToBeRemoved,
        },
      },
    );

    const { status, body } = response.data;

    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to remove from cart");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getCarts = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: CartBodyResponse) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response =
      await axiosInstance.get<BaseResponse<CartBodyResponse>>(`/cart/get`);
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("failed to get items in cart");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
export const setQuantityCart = async ({
  productId,
  groupName,
  quantity,
  onSuccess,
  onError,
}: {
  productId: string;
  groupName: string;
  quantity: number;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.patch<BaseResponse<string>>(
      `/cart/setQuantity`,
      { productId, groupName, quantity },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("failed to update item quantity");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
