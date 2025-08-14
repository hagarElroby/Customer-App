import { BaseResponse } from "@/types/baseResponse";
import axiosInstance from "../axios/axiosInstance";
import { ResponseError } from "@/types/error-types";
import { updatePhoneParams } from "@/types/user";

export const updatePhoneNumber = async ({
  formData,
  onSuccess,
  onError,
}: {
  formData: updatePhoneParams;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: { message: string; verificationToken: string }) => void;
}) => {
  try {
    const response = await axiosInstance.patch<
      BaseResponse<{ message: string; verificationToken: string }>
    >("/users/updatePhoneNumber", formData);
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      localStorage.setItem("verificationPhone", body.verificationToken);
    } else {
      throw new Error("Failed to update phone number");
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

export const verifyPhoneNumberUpdate = async ({
  phoneNumber,
  role,
  code,
  onSuccess,
  onError,
}: {
  phoneNumber: string;
  role: string;
  code: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: { message: string }) => void;
}) => {
  const verifyToken = localStorage.getItem("verificationPhone");
  try {
    const response = await axiosInstance.post<
      BaseResponse<{ message: string }>
    >(
      "/users/verifyPhoneNumberUpdate",
      {
        role,
        code,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${verifyToken}`,
        },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to verify phone number");
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
