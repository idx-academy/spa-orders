export type TimerId = ReturnType<typeof setTimeout>;

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
