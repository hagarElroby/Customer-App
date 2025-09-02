import { ResponseError } from "@/types/error-types";
import { NotificationObject, NotificationType } from "@/types/notifications";
import axiosInstance from "../axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

export const getMyNotifications = async ({
  page,
  limit,
  type,
  onSuccess,
  onError,
}: {
  page?: number;
  limit?: number;
  type?: NotificationType;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
    docs: NotificationObject[];
  }) => void;
}) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<{
        total: number;
        totalPages: number;
        page: number;
        limit: number;
        docs: NotificationObject[];
      }>
    >("/notifications/me", { params: { page, limit, type } });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get notifications");
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
