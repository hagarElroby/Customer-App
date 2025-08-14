import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

export const removeFCMToken = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: { message: string }) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const fcmToken = localStorage.getItem("FCMToken");
    const response = await axiosInstance.patch<
      BaseResponse<{ message: string }>
    >(`/users/removeFCMToken?fcmToken=${fcmToken}`);

    const { status, body } = response.data;

    if (status === 200 || status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to remove FCM token");
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
