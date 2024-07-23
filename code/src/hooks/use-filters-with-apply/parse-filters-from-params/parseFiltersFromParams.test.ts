import parseFiltersFromParams from "@/hooks/use-filters-with-apply/parse-filters-from-params/parseFiltersFromParams";

const defaultFiltersWithFilter1 = { filter1: "value1" };
const defaultFiltersWithFilter2 = { filter2: "value1" };

describe("parseFiltersFromParams", () => {
  test("returns default filters when no filters are applied inside params", () => {
    const parsedValue = parseFiltersFromParams(
      defaultFiltersWithFilter1,
      new URLSearchParams()
    );

    expect(parsedValue.defaultActiveFilters.size).toBe(0);
    expect(parsedValue.defaultFiltersFromParams).toEqual(
      defaultFiltersWithFilter1
    );
  });

  test("prefers using filter from params to default filter", () => {
    const searchParams = new URLSearchParams(defaultFiltersWithFilter2);
    const parsedValue = parseFiltersFromParams(
      defaultFiltersWithFilter2,
      searchParams
    );

    expect(parsedValue.defaultActiveFilters.size).toBe(1);
    expect(parsedValue.defaultFiltersFromParams).toEqual(
      defaultFiltersWithFilter2
    );
  });

  test("throws an error if at least one of default filter's value is not supported", () => {
    const executeParseFiltersFromParams = () =>
      parseFiltersFromParams({ test: {} }, new URLSearchParams());
    expect(executeParseFiltersFromParams).toThrow();
  });
});
