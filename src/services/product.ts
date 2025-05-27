import {
  OneProductResponse,
  TotalProductsNumber,
  AllProductsBody,
  GetFeatureBody,
  ProductFetchParams,
} from "./../types/product";
import { BaseResponse } from "@/types/baseResponse";
import { ResponseError } from "@/types/error-types";
import axiosInstance from "./axios/axiosInstance";

export const getOneProduct = async ({
  onError,
  onSuccess,
  productId,
  groupName,
  getCategoryDetails,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: OneProductResponse) => void;
  productId: string;
  groupName?: string;
  getCategoryDetails?: boolean;
}) => {
  try {
    const response = await axiosInstance.get<BaseResponse<OneProductResponse>>(
      "/products/get-One-Product",
      {
        params: { productId, getCategoryDetails, groupName },
      },
    );

    const { status, description, body } = response.data;
    if (status === 201 && description === "OK") {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to fetch product");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getAllProducts = async ({
  onError,
  onSuccess,
  file,
  ...params
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: AllProductsBody) => void;
} & { file?: File } & ProductFetchParams) => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    const response = await axiosInstance.post<BaseResponse<AllProductsBody>>(
      "/products/get-all",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params,
      },
    );
    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getAllProductsLight = async ({
  onError,
  onSuccess,
  subCategory,
  categoryId,
  productName,
  page,
  limit,
  allowPagination,
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: AllProductsBody) => void;
  subCategory?: string;
  categoryId?: string;
  productName: string;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
}) => {
  try {
    const params = {
      subCategory,
      categoryId,
      productName,
      page,
      limit,
      allowPagination,
    };

    const response = await axiosInstance.get<BaseResponse<AllProductsBody>>(
      "/products/get-all-light",
      { params },
    );

    const { status, body } = response.data;
    if (status === 201) {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get product data");
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

export const getTotalProductsNumber = async ({
  onError,
  onSuccess,
  ...params
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: TotalProductsNumber) => void;
} & ProductFetchParams) => {
  try {
    const response = await axiosInstance.get<BaseResponse<TotalProductsNumber>>(
      "/products/getTotalProducts",
      { params },
    );
    const { status, description, body } = response.data;
    if (status === 201 && description === "OK") {
      onSuccess?.(body);
      return body;
    } else {
      throw new Error("Failed to get total products count");
    }
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};

export const getFeatures = async ({
  onError,
  onSuccess,
  ...params
}: {
  onError?: (error: ResponseError) => void;
  onSuccess?: (data: GetFeatureBody) => void;
} & { subCategory?: string; categoryId?: string; productName?: string }) => {
  try {
    const response = await axiosInstance.get<BaseResponse<GetFeatureBody>>(
      "/products/get-Feature",
      { params },
    );
    const { status, description, body } = response.data;
    if (status === 201 && description === "OK") {
      onSuccess?.(body);
    } else {
      throw new Error("Failed to fetch features");
    }
    return body;
  } catch (error: any) {
    const typedError = error.response?.data as ResponseError;
    onError?.(typedError || { description: "An unexpected error occurred" });
    return null;
  }
};
