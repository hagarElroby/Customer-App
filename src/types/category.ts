import { Feature } from "./product";

export type CategoryInSub = {
  id: string;
  name: string;
  fee: number;
};

export interface SubCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  isActive?: boolean;
  features?: Feature[];
  category?: CategoryInSub;
}
export interface SubCategoryBody {
  docs: SubCategory[];
  totalDocs: number;
  totalPages: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  fee: number;
  isActive: boolean;
  subCategories: SubCategory[];
}
