import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

export const restoreAccount = async ({
  phoneNumber,
  role,
  onSuccess,
  onError,
}: {
  phoneNumber: string;
  role: string;
  onError?: (error: ResponseError) => void;
  //if the account is deleted less than 30 days ago, the error code is 173 (user can restore account)
  // if the account is deleted more than 30 days ago, the error code is 103 (account is permanently deleted)
  onSuccess?: (data: { message: string; verificationToken: string }) => void;
}) => {
  try {
    const response = await axiosInstance.post<
      BaseResponse<{ message: string; verificationToken: string }>
    >("/users/restoreAccount", {
      role,
      phoneNumber,
    });
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      localStorage.setItem("restoreToken", body.verificationToken);
    } else {
      throw new Error("Failed to restore account");
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
export const verifyRestoreAccount = async ({
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
  //TODO check return
  onSuccess?: (data: { message: string }) => void;
}) => {
  const restoreToken = localStorage.getItem("restoreToken");
  try {
    const response = await axiosInstance.post<
      BaseResponse<{ message: string }>
    >(
      "/users/verifyRestoreAccount",
      {
        role,
        code,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${restoreToken}`,
        },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to restore account");
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
