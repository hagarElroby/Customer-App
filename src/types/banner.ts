export interface Banner {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  portalImageUrl?: string;
  link: string;
  isActive: boolean;
}
