export type TimerId = ReturnType<typeof setTimeout>;

// utility to debug typescript. More: https://www.youtube.com/watch?v=2lCCKiWGlC0
export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type Pageable = {
  page: number;
  size: number;
  sort: string[];
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type APIError = {
  status: number;
  title: string;
  detail: string;
};

export type RTKQueryReturnState<TData = null, TError = null> = {
  data: TData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | null;
};

export type PaginationParams = {
  page: number;
  size: number;
  sort: string;
};

export type RTKQueryMockState<TData = null, TError = null> = Partial<
  RTKQueryReturnState<TData, TError>
>;
