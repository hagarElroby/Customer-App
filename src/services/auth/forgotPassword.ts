import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";

export const forgotPasswordSendOtp = async ({
  onError,
  onSuccess,
  phoneNumber,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
  phoneNumber: string;
}) => {
  try {
    const role = "USER";
    const res = await axiosInstance.post<BaseResponse<string>>(
      "/users/forgotPassword/sendOtp",
      {
        phoneNumber,
        role,
      },
    );

    const { status } = res.data;
    if (status === 201) {
      onSuccess?.(res.data);
    } else {
      throw new Error("Failed to send OTP");
    }
    return res;
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

export const forgotPasswordVerifyOtp = async ({
  onError,
  onSuccess,
  phoneNumber,
  role,
  code,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
  phoneNumber: string;
  role: string;
  code: string;
}) => {
  try {
    const res = await axiosInstance.post<BaseResponse<string>>(
      "/users/forgotPassword/verifyOtp",
      {
        phoneNumber,
        role,
        code,
      },
    );

    const { status } = res.data;
    if (status === 201) {
      onSuccess?.(res.data);
      localStorage.setItem("forgotPasswordToken", res.data.body);
    } else {
      throw new Error("Failed to Verify OTP");
    }
    return res;
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

export const resetPassword = async ({
  onError,
  onSuccess,
  password,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
  password: string;
}) => {
  try {
    const res = await axiosInstance.patch<BaseResponse<string>>(
      "/users/forgetPassword/resetPassword",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("forgotPasswordToken")}`,
        },
      },
    );

    const { status } = res.data;
    if (status === 201) {
      onSuccess?.(res.data);
    } else {
      throw new Error("Failed to update password");
    }
    return res;
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
