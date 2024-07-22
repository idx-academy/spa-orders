import parseFiltersFromParams from "@/hooks/use-filters-with-apply/parse-filters-from-params/parseFiltersFromParams";

describe("parseFiltersFromParams", () => {
  test("returns default filters when no filters are applied inside params", () => {
    const defaultFilters = { filter1: "value1" };
    const parsedValue = parseFiltersFromParams(
      defaultFilters,
      new URLSearchParams()
    );

    expect(parsedValue.defaultActiveFilters.size).toBe(0);
    expect(parsedValue.defaultFiltersFromParams).toEqual(defaultFilters);
  });

  test("prefers using filter from params to default filter", () => {
    const defaultFilters = { filter2: "value1" };
    const searchParams = new URLSearchParams({ filter2: "value2" });
    const parsedValue = parseFiltersFromParams(defaultFilters, searchParams);

    expect(parsedValue.defaultActiveFilters.size).toBe(1);
    expect(parsedValue.defaultFiltersFromParams).toEqual({ filter2: "value2" });
  });

  test("throws an error if at least one of default filter's value is not supported", () => {
    const executeParseFiltersFromParams = () =>
      parseFiltersFromParams({ test: {} }, new URLSearchParams());
    expect(executeParseFiltersFromParams).toThrow();
  });
});
