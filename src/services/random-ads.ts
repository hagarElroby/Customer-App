import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import { AdObject } from "@/types/ads";

export const getRandomAds = async ({
  categoryId,
  subCategoryId,
  onSuccess,
  onError,
}: {
  categoryId?: string;
  subCategoryId?: boolean;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: AdObject[]) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<AdObject[]>>(
      "/campaign/get-random-Aads",
      {
        params: { categoryId, subCategoryId },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get ads");
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
