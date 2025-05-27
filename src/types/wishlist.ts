export interface FavoriteProduct {
  productId: string;
  groupName: string;
  discountPercentage: number;
  productName: string;
  productCover: string;
  rating: number;
  ratingCount: number;
  companyName: string;
  priceBeforeDiscount: number;
  priceAfterDiscount: number;
  inCart: boolean;
}
