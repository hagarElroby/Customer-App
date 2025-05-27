import { Seller } from "./productsList";

export interface BrowseObject {
  _id: string;
  groupName: string;
  rating: number;
  ratingCount: number;
  productCover: string;
  companyName: string;
  productName: string;
  // unitAndPrice: {
  //   priceBeforeDiscount?: number;
  //   priceAfterDiscount?: number;
  // };
  PriceBeforeDiscount: number;
  PriceAfterDiscount: number;
  seller: Seller;
  inWishlist: boolean;
  inCart: boolean;
}
