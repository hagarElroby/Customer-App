import { UploadeFileResponse } from "@/types/media";
import axiosInstance from "./axios/axiosInstance";
import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";

export const uploadFileService = async ({
  folderName,
  file,
  onSuccess,
  onError,
}: {
  folderName: string;
  file: File;
  onSuccess?: (data: UploadeFileResponse) => void;
  onError?: (error: ResponseError) => void;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post<
      BaseResponse<UploadeFileResponse>
    >(`/files/uploadFile?folderName=${folderName}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onSuccess?.(response.data.body);
    return response.data;
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
