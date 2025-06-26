import { AuctionListObject } from "@/types/auction";
import { BaseResponse, BodyResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";

export const payDeposit = async ({
  auctionId,
  paymentMethod,
  onError,
  onSuccess,
}: {
  auctionId: string;
  paymentMethod: string;
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: BaseResponse<string>) => void;
}) => {
  try {
    const res = await axiosInstance.post<BaseResponse<string>>(
      "/bid/user/deposit",
      { auctionId, paymentMethod },
    );
    onSuccess?.(res.data);
    return res.data;
  } catch (error: unknown) {
    const typedError = (error as { response?: { data?: ResponseError } })
      ?.response?.data;

    onError?.(typedError ?? { description: "An unexpected error occurred" });

    return null;
  }
};

export const placeBid = async ({
  auctionId,
  bidAmount,
  onSuccess,
  onError,
}: {
  auctionId: string;
  bidAmount: number;
  onSuccess?: (data: BaseResponse<string>) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const res = await axiosInstance.post<BaseResponse<string>>(
      "/bid/user/place-bid",
      { auctionId, bidAmount },
    );
    onSuccess?.(res.data);
    return res.data;
  } catch (error: unknown) {
    const typedError = (error as { response?: { data?: ResponseError } })
      ?.response?.data;

    onError?.(typedError ?? { description: "An unexpected error occurred" });

    return null;
  }
};

export const gitBid = async ({
  auctionId,
  onSuccess,
  onError,
}: {
  auctionId: string;
  bidAmount: number;
  onSuccess?: (data: BaseResponse<string>) => void;
  onError?: (error: ResponseError) => void;
}) => {
  try {
    const res = await axiosInstance.get<BaseResponse<string>>("/bid/user/get", {
      params: { auctionId },
    });
    onSuccess?.(res.data);
    return res.data;
  } catch (error: unknown) {
    const typedError = (error as { response?: { data?: ResponseError } })
      ?.response?.data;

    onError?.(typedError ?? { description: "An unexpected error occurred" });

    return null;
  }
};
