import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";
import { AxiosResponse } from "axios";
import { BaseResponse } from "@/types/baseResponse";

type InitialSignupResponse = {
  message: string;
  verificationToken: string;
};

export const initiateSignup = async ({
  onError,
  onSuccess,
  phoneNumber,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: InitialSignupResponse) => void;
  phoneNumber: string;
}) => {
  const role = "USER";
  try {
    const res: AxiosResponse<InitialSignupResponse> = await axiosInstance.post(
      "/users/initiateSignUp",
      {
        phoneNumber,
        role,
      },
    );
    onSuccess?.(res.data);
    localStorage.setItem("verificationToken", res.data.verificationToken);
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

export const resendSignup = async ({
  onError,
  onSuccess,
  phoneNumber,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: InitialSignupResponse) => void;
  phoneNumber: string;
}) => {
  const role = "USER";
  try {
    const res: AxiosResponse<BaseResponse<InitialSignupResponse>> =
      await axiosInstance.post("/users/resendSignUpOtp", {
        phoneNumber,
        role,
      });
    onSuccess?.(res.data.body);
    localStorage.setItem("verificationToken", res.data.body.verificationToken);
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

export const verifySignup = async ({
  onError,
  onSuccess,
  phoneNumber,
  code,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: InitialSignupResponse) => void;
  phoneNumber: string;
  code: string;
}) => {
  const role = "USER";
  const verificationToken = localStorage.getItem("verificationToken");
  try {
    const res: AxiosResponse<InitialSignupResponse> = await axiosInstance.post(
      "/users/verifySignUp",
      {
        phoneNumber,
        role,
        code,
      },
      {
        headers: { Authorization: `Bearer ${verificationToken}` },
      },
    );
    onSuccess?.(res.data);
    localStorage.setItem("verificationToken", res.data.verificationToken);
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

export const completeSignup = async ({
  onError,
  onSuccess,
  firstName,
  middleName,
  lastName,
  email,
  password,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: { message: string }) => void;
  firstName: string;
  middleName: string;
  lastName: string;
  email?: string;
  password: string;
}) => {
  const role = "USER";
  const verificationToken = localStorage.getItem("verificationToken");

  try {
    const res: AxiosResponse<{ message: string }> = await axiosInstance.post(
      "/users/completeSignUp",
      {
        firstName,
        middleName,
        lastName,
        email,
        password,
        role,
      },
      {
        headers: { Authorization: `Bearer ${verificationToken}` },
      },
    );
    onSuccess?.(res.data);
    localStorage.removeItem("verificationToken");
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
