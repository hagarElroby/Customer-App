import { type UserLoginResponse } from "@/types/user";
import { type ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

export const signup = async ({
  onError,
  onSuccess,
  fireBaseToken,
  ...rest
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: UserLoginResponse) => void;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  fireBaseToken: string;
}) => {
  try {
    const res = await axiosInstance.post(
      "/users/signup",
      {
        ...rest,
      },
      {
        headers: { Authorization: `Bearer ${fireBaseToken}` },
      },
    );

    const { status } = res.data;
    if (status === 201) {
      onSuccess?.(res.data);
    } else {
      throw new Error("Sign-up failed");
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

export const forgotPasswordSendOtp = async ({
  onError,
  onSuccess,
  phoneNumber,
  role,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
  phoneNumber: string;
  role: string;
}) => {
  try {
    const res = await axiosInstance.patch<BaseResponse<string>>(
      "/users/forgotPassword/sendOtp",
      {},
      {
        params: { phoneNumber, role },
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
    const res = await axiosInstance.get<BaseResponse<string>>(
      "/users/forgotPassword/verifyOtp",
      {
        params: { phoneNumber, role, code },
      },
    );

    const { status } = res.data;
    if (status === 201) {
      onSuccess?.(res.data);
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

export const login = async ({
  onError,
  onSuccess,
  phoneNumber,
  password,
  role,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: UserLoginResponse) => void;
  phoneNumber: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axiosInstance.post<
      BaseResponse<{ user: UserLoginResponse }>
    >("/users/signin", {
      phoneNumber,
      password,
      role,
    });

    const { status } = response.data;
    if (status === 201) {
      onSuccess?.(response.data.body.user);
    } else {
      throw new Error("Login failed");
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

export const logout = async ({
  onError,
  onSuccess,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
}) => {
  try {
    const response =
      await axiosInstance.delete<BaseResponse<string>>(`/users/logout`);

    const { status } = response.data;
    if (status === 201) {
      onSuccess?.(response.data);
    } else {
      throw new Error("Logout failed");
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
