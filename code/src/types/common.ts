import { timeSpans } from "@/constants/timeSpans";
import { Locale } from "@/context/i18n/I18nProvider";

export type TimerId = ReturnType<typeof setTimeout>;
export type NonEmptyArray<T> = [T, ...T[]];
export type ExtractValues<T> = T[keyof T];
export type ExtractSetValue<T> = T extends Set<infer U> ? U : never;

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

export type SortOrder = "asc" | "desc";
export type Lang = {
  lang: Locale;
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

export type TimeSpan = keyof typeof timeSpans;

export type PageableResponse<Content> = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
  content: Content;
};
