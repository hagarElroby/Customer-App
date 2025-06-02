import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "../axios/axiosInstance";

export const logout = async ({
  onError,
  onSuccess,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
}) => {
  const refreshToken = localStorage.getItem("jwtRefreshToken");
  try {
    const response = await axiosInstance.delete<BaseResponse<string>>(
      `/users/logout`,
      {
        params: {
          refreshToken,
        },
      },
    );

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
