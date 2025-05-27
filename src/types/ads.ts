export interface AdObject {
  _id: string;
  title: string;
  description: string;
  url: string;
  portalImageUrl: PortalImageUrl;
  mobileImageUrl: PortalImageUrl;
  companyName: string;
  priceBeforeDiscount: number;
  priceAfterDiscount?: number;
  stock: number;
  productCover: string;
  productName: string;
}

export interface PortalImageUrl {
  image: string;
  cover: string;
}
