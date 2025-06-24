import { Flags, ProductType } from "./product";

export type AuctionStatus = "PENDING" | "ACTIVE" | "ENDED" | "CANCELLED";

export type AuctionApprovalStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED";

export type AuctionById = {
  _id: string;
  productName: string;
  productDescription: string[];
  productType: ProductType;
  flags: Flags[];
  tags: string[];
  media: {
    productCover: string;
    productVideo: string;
    productImages: string[];
  };
  subCategory: {
    _id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
  categoryId: string;
  seller: string;
  isActive: boolean;
  auctionStatus: AuctionStatus;
  approvalStatus: AuctionApprovalStatus;
  productProperties: {
    propertyId: string;
    propertyName: string;
    unitId: string;
    unitName: string;
    propertyValue: {
      valueIds: string;
      valueName: string;
    }[];
  }[];
  shipping: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  auctionDetails: {
    startDate: string;
    endDate: string;
    startBidFrom: number;
    minimumBidPerTime: number;
    buyIfReach: number;
    securityDeposit: number;
    currentBid: number;
    highestBidder: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    timezone: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  bids: {
    totalBids: {
      count: number;
    };
    recentBids: {
      _id: string;
      bidAmount: number;
      createdAt: string;
      firstName: string;
      lastName: string;
    }[];
  };
};

export type AuctionListParams = {
  page?: number;
  limit?: number;
  allowPagination?: boolean;

  startDate?: string;
  endDate?: string;

  productType?: ProductType;
  subCategoryId?: string;
  categoryId?: string;

  approvalStatus?: AuctionStatus;
  auctionStatus?: AuctionApprovalStatus;
};

export type AuctionListObject = {
  _id: string;
  productName: string;
  productDescription: string[];
  productType: ProductType;
  flags: Flags[];
  tags: string[];
  media: {
    productCover: string;
    productVideo: string;
    productImages: string[];
  };
  subCategory: {
    _id: string;
    name: string;
    category: {
      id: string;
      name: string;
      fee: number;
    };
  };
  categoryId: string;
  seller: string;
  isActive: boolean;
  auctionStatus: AuctionStatus;
  approvalStatus: AuctionApprovalStatus;
  productProperties: {
    key: string;
    values: string[];
  }[];
  shipping: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  auctionDetails: {
    startDate: string;
    endDate: string;
    startBidFrom: number;
    minimumBidPerTime: number;
    buyIfReach: number;
    securityDeposit: number;
    currentBid: number;
    highestBidder: string | null;
    timezone: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  bids: {
    totalBids: {
      count: number;
    };
    recentBids: {
      _id: string;
      bidAmount: number;
      createdAt: string;
      firstName: string;
      lastName: string;
    }[];
  };
};
