export interface BaseResponsePaginationResult {
  success: boolean;
  items: any[];
  totalPages: number;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  messageError: string;
}
export interface BaseResponseResult {
  success: boolean;
  messageError: string;
  data: any;
  include: any;
}
