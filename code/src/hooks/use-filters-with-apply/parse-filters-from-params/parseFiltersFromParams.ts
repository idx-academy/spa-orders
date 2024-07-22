import checkSupportedSerializedFilter from "@/hooks/use-filters-with-apply/check-supported-serialized-filter/checkSupportedSerializedFilter";
import deserializeFromQueryString from "@/hooks/use-filters-with-apply/deserialize-from-query-string/deserializeFromQueryString";

const parseFiltersFromParams = <Filters>(
  defaultFilters: Filters,
  searchParams: URLSearchParams
) => {
  const activeFilters = new Set<keyof Filters>();
  const filters = {} as Filters;

  for (const key in defaultFilters) {
    const paramValue = searchParams.get(key);

    const defaultFilterValue = defaultFilters[key];

    if (!checkSupportedSerializedFilter(defaultFilterValue)) {
      throw new Error(
        "Serialization for this type of value is not supported! Supported types are: number, string, boolean, null, Set and FilterRange"
      );
    }

    if (paramValue !== null) {
      filters[key] = deserializeFromQueryString(paramValue);
      activeFilters.add(key);
    } else {
      filters[key] = defaultFilterValue;
    }
  }

  return {
    defaultFiltersFromParams: filters,
    defaultActiveFilters: activeFilters
  };
};

export default parseFiltersFromParams;
