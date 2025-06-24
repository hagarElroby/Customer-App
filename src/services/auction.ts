import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";
import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import {
  AuctionById,
  AuctionListObject,
  AuctionListParams,
} from "@/types/auction";

export const getOneAuction = async ({
  auctionId,
  onSuccess,
  onError,
}: {
  auctionId: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: AuctionById) => void;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<AuctionById>>(
      "/auction/user/get",
      {
        params: { auctionId },
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get auction data");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getAuctionList = async ({
  page,
  limit,
  allowPagination,
  approvalStatus,
  auctionStatus,
  startDate,
  endDate,
  subCategoryId,
  categoryId,
  productType,
  onError,
  onSuccess,
}: AuctionListParams & {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BodyResponse<AuctionListObject>) => void;
}) => {
  try {
    const res = await axiosInstance.get<
      BaseResponse<BodyResponse<AuctionListObject>>
    >("/auction/user/list", {
      params: {
        page,
        limit,
        allowPagination,
        approvalStatus,
        auctionStatus,
        subCategoryId,
        categoryId,
        productType,
        startDate,
        endDate,
      },
    });
    onSuccess?.(res.data.body);
    return res.data.body;
  } catch (error: unknown) {
    const typedError = (error as { response?: { data?: ResponseError } })
      ?.response?.data;

    onError?.(typedError ?? { description: "An unexpected error occurred" });

    return null;
  }
};
