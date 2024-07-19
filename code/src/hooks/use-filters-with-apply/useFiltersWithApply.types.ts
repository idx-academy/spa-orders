export type RangeFilter<T> = {
  start: T;
  end: T;
};

export type UpdateFilterByKey<Filters> = <Key extends keyof Filters>(
  key: Key,
  value: Filters[Key]
) => void;

export type ResetFilterByKey<Filters> = <Key extends keyof Filters>(
  key: Key
) => void;

export type CheckFilterActive<Filters> = <Key extends keyof Filters>(
  key: Key
) => boolean;

export type ResetFilters = () => void;

export type ApplyFilters = () => void;

export type FilterActions<Filters> = {
  updateFilterByKey: UpdateFilterByKey<Filters>;
  resetFilterByKey: ResetFilterByKey<Filters>;
  resetFilters: ResetFilters;
  checkFilterActive: CheckFilterActive<Filters>;
  applyFilters: () => void;
};
