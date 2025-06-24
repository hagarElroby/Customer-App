import { SubCategory } from "./category";

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

interface Seller {
  _id?: string;
  companyName?: string;
}

interface CampaignObject {
  campaignId: string;
  isSponsored: boolean;
  endDate: string;
}

export interface AllProductsDocs {
  _id: string;
  productName: string;
  productCover: string;
  seller: Seller;
  rating: number;
  ratingCount: number;
  PriceBeforeDiscount: number;
  PriceAfterDiscount: number;
  groupName: string;
  inWishlist?: boolean;
  inCart?: boolean;
  campaign?: CampaignObject;
  quantityAndPrice?: QuantityPriceItem;
}
export interface BrowsedProduct {
  productId: string;
  productName: string;
  productCover: string;
  seller: Seller;
  rating: number;
  ratingCount: number;
  PriceBeforeDiscount: number;
  PriceAfterDiscount: number;
  groupName: string;
  inWishlist?: boolean;
  inCart?: boolean;
}

export interface AllProductsBody {
  docs: AllProductsDocs[];
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
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

export interface GetFeatureBody {
  features: Feature[];
  priceRange: PriceRange;
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

export interface Variant {
  key: string;
  propertyName: string;
  value: string;
  propertyValueName: string;
  unitId: string;
  unitName: string;
}

export interface QuantityPriceItem {
  groupName: string;
  variation: Variant[];
  unitCost: string;
  stock: string;
  quantityCost: string;
  minimumQuantity: string;
  productImages: string[];
  isActive?: boolean;
  _id?: string;
  haveQuantityCost?: boolean;
}

export interface OneProductApiResponse {
  status: number;
  description: string;
  flag: any;
  body: OneProductResponse;
}

type Discount = {
  startDate: string;
  endDate: string;
  percentage: number;
};

export interface OneProductResponse {
  _id: string;
  productName: string;
  productDescription: string[];
  productType: ProductType;
  productCover: string;
  productVideo: string;
  discount: Discount;
  vatPercentage: number;
  taxPercentage: number;
  quantityAndPrice: QuantityAndPrice[];
  isActive: boolean;
  rating: number;
  ratingCount: number;
  productProperties: ProductProperty[];
  tags: string[];
  shipping: Shipping;
  companyName?: string;
  subCategory?: SubCategory;
}

export interface QuantityAndPrice {
  groupName: string;
  unitCost: number;
  stock: number;
  quantityCost: number;
  minimumQuantity: number;
  productImages: string[];
  variation: Variation[];
  inWishlist: boolean;
  quantityInCart: number;
}

export interface Variation {
  key: string;
  propertyName: string;
  value: string;
  propertyValueName: string;
  unitId: string;
  unitName: string;
}

export interface ProductProperty {
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitName: string;
  propertyValue: PropertyValue[];
}

export interface PropertyValue {
  valueIds: string;
  valueName: string;
}

export interface Shipping {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export type ProductType = "NEW" | "USED";

export interface ProductGeneralInfo {
  productName: string;
  productDescribtion: string;
  productType: ProductType;
}

export type TotalProductsNumber = {
  totalProducts: number;
};

export const flags = [
  "FRAGILE",
  "CONTAINS_BATTERY",
  "HAZARDOUS_MATERIAL",
  "REQUIRES_REFRIGERATION",
  "HIGH_VALUE_SHIPMENT",
  "SIGNATURE_REQUIRED",
  "LIVE_ANIMAL",
  "PERISHABLE_GOODS",
  "DO_NOT_STACK",
  "SPECIAL_HANDLING_REQUIRED",
  "CHEMICAL_SUBSTANCE",
  "HUMIDITY_SENSITIVE",
  "LIGHT_SENSITIVE",
  "MUST_BE_KEPT_UPRIGHT",
  "UNSTABLE_WEIGHT_DISTRIBUTION",
  "PRESSURIZED_CONTAINER",
] as const;

export type Flags = (typeof flags)[number];
