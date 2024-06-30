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
