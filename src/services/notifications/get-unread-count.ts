import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";

export const getUnreadCount = async ({
  onSuccess,
  onError,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: number) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<number>>(
      "/notifications/me/unread-count",
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get unread notifications");
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
