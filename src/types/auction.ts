import { Flags, ProductType } from "./product";

export type AuctionStatus = "PENDING" | "ACTIVE" | "ENDED" | "CANCELLED";

export type ApprovalStatus = "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";

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
  seller: Seller;
  isActive: boolean;
  auctionStatus: AuctionStatus;
  approvalStatus: ApprovalStatus;
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
  shipping: Shipping;
  auctionDetails: AuctionDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bids: Bids;
};

export type Shipping = {
  weight: number;
  length: number;
  width: number;
  height: number;
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
  auctionStatus?: ApprovalStatus;
  productName?: string;
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
  seller: Seller;
  isActive: boolean;
  auctionStatus: AuctionStatus;
  approvalStatus: ApprovalStatus;
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
  auctionDetails: AuctionDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rejectionReasons: AuctionRejectionReasons[];
  bids: Bids;
};

export type AuctionDetails = {
  startDate: string;
  endDate: string;
  startBidFrom: number;
  minimumBidPerTime: number;
  buyIfReach?: number;
  securityDeposit?: number;
  currentBid: number;
  highestBidder?: HighestBidder;
  timezone?: string;
};

export type HighestBidder = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type RecentBids = {
  _id: string;
  bidAmount: number;
  createdAt: string;
  firstName: string;
  lastName: string;
};

export type TotalBids = {
  count: 5;
};

export type Bids = {
  totalBids: TotalBids;
  recentBids: RecentBids[];
};

export type AuctionRejectionReasons =
  | "INAPPROPRIATE_CONTENT"
  | "VIOLATION_OF_POLICY"
  | "INCOMPLETE_INFORMATION"
  | "MEDIA_ISSUE"
  | "SPELLING_MISTAKE"
  | "OTHER";

export type Seller = {
  _id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  profilePicture?: string;
};
