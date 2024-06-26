export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PaginationParams = {
  offset: number;
  limit: number;
};
export type Errors<T> = Partial<Record<keyof T, string>>;
