export interface BaseResponse<T> {
  status: number;
  description: string;
  flag: string | null;
  body: T;
}

export interface BodyResponse<T> {
  docs: T[];
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
}
