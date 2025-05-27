import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import { Address, ProfileModel, UpdateProfile } from "@/types/user";
import axiosInstance from "./axios/axiosInstance";
export const getMyProfile = async ({
  onSuccess,
  onError,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: ProfileModel) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<ProfileModel>>(
      "/users/getMyProfile",
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get profile data");
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

export const updateProfile = async ({
  formData,
  onSuccess,
  onError,
}: {
  formData: UpdateProfile;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: string) => void;
}) => {
  try {
    const response = await axiosInstance.patch<BaseResponse<string>>(
      "/users/profileUpdate",
      formData,
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to update profile");
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

export const updateAddress = async ({
  formData,
  onSuccess,
  onError,
}: {
  formData: Address;
  onSuccess?: (data: string) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const response = await axiosInstance.patch<BaseResponse<string>>(
      "/users/addressUpdate",
      formData,
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to update address");
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
    const response = await axiosInstance.patch<BaseResponse<string>>(
      `/users/emailVerification/sendOtp?email=${encodeURIComponent(email)}&id=${encodeURIComponent(id)}`,
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
