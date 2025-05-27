export interface Value {
  valueId: string;
  valueName: string;
}

export interface Feature {
  propertyId: string;
  propertName: string;
  unitId: string;
  unitName: string;
  values: Value[];
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface Seller {
  _id: string;
  companyName: string;
}

export interface ProductResponse {
  _id: string;
  productName: string;
  productCover: string;
  seller: Seller;
  rating: number;
  ratingCount: number;
  PriceBeforeDiscount: number;
  PriceAfterDiscount: number;
  groupName: string;
  inWishlist: boolean;
  inCart: boolean;
}

export interface SortOptions {
  sort:
    | "POPULARITY"
    | "NEWEST"
    | "PRICE_LOW_TO_HIGH"
    | "PRICE_HIGH_TO_LOW"
    | "BEST_SELLER"
    | "SIMILARITY";
}
export type SortType = SortOptions["sort"];

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface ProductFetchParams {
  fromAdminPanel?: boolean;
  subCategory?: string;
  categoryId?: string;
  fetchSponsored?: boolean;
  page?: number;
  limit?: number;
  allowPagination?: boolean;
  productName?: string;
  propertyIds?: string[];
  propertyValueIds?: string[];
  sort?: SortType;
  priceStartFrom?: number;
  priceEndTo?: number;
  rateFrom?: number;
  sellerId?: string;
  file?: File;
}

export interface FavoriteProductResponse {
  productId: string;
  groupName: string;
  productName: string;
  productCover: string;
  rating: number;
  ratingCount: number;
  companyName: string;
  priceAfterDiscount: number;
}
