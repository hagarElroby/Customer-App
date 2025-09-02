import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";

export const markAllAsRead = async ({
  onSuccess,
  onError,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: string) => void;
}) => {
  try {
    const response = await axiosInstance.patch<BaseResponse<string>>(
      "/notifications/me/read-all",
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to mark all as read");
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
