import { ResponseError } from "@/types/error-types";
import { UserLoginResponse } from "@/types/user";
import axiosInstance from "../axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";

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
