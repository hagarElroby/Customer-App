export interface CartProduct {
  _id: string;
  quantity: number;
  inWishlist: boolean;
  productId: string;
  groupName: string;
  vatPercentage: number;
  taxPercentage: number;
  discountPercentage: number;
  qunatityAndPrice: {
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
  };
  productName: string;
  productCover: string;
  rating: number;
  ratingCount: number;
  companyName: string;
}

export interface OrderSummary {
  totalBeforeDiscount?: number;
  discount?: number;
  totalAfterDiscount?: number;
  vat?: number;
  tax?: number;
  grandTotal?: number;
}

export interface CartBodyResponse {
  docs: CartProduct[];
  orderSummary: OrderSummary;
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
}
