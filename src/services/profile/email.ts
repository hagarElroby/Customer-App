import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import { BodyUpdateProfile, updateEmailParams } from "@/types/user";
import axiosInstance from "../axios/axiosInstance";

export const updateEmail = async ({
  formData,
  onSuccess,
  onError,
}: {
  formData: Partial<updateEmailParams>;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: { message: string; verificationToken: string }) => void;
}) => {
  try {
    const response = await axiosInstance.patch<
      BaseResponse<{ message: string; verificationToken: string }>
    >("/users/updateEmail", formData);
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      localStorage.setItem("verificationEmail", body.verificationToken);
    } else {
      throw new Error("Failed to update email");
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

export const sendEmailOtp = async ({
  email,
  id,
  onSuccess,
  onError,
}: {
  email: string;
  id: string;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.post<BaseResponse<string>>(
      `/users/emailVerification/sendOtp`,
      {
        email,
        id,
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to send otp");
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
export const verifyEmailOtp = async ({
  email,
  id,
  code,
  onSuccess,
  onError,
}: {
  email: string;
  id: string;
  code: string;
  onSuccess?: (data: BodyUpdateProfile) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const verifyToken = localStorage.getItem("verificationEmail");
    const response = await axiosInstance.post<BaseResponse<BodyUpdateProfile>>(
      `/users/emailVerification/verifyOtp`,
      {
        email,
        id,
        code,
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
      localStorage.setItem("jwtToken", body.jwtToken);
      localStorage.setItem("jwtRefreshToken", body.jwtRefreshToken);
    } else {
      throw new Error("Failed to verify otp");
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
