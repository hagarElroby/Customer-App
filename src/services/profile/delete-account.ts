import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

export const deleteAccount = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: { message: string }) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.delete<
      BaseResponse<{ message: string }>
    >("/users/deleteAccount");

    const { status, body } = response.data;

    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to delete account");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
