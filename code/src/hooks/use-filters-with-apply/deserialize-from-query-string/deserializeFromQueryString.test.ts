import deserializeFromQueryString from "@/hooks/use-filters-with-apply/deserialize-from-query-string/deserializeFromQueryString";

describe("deserializeFromQueryString", () => {
  test("deserializes null correctly", () => {
    const parsedValue = deserializeFromQueryString("null");
    expect(parsedValue).toBeNull();
  });

  test("deserializes 'number' type correctly", () => {
    const integerParsedValue = deserializeFromQueryString("100");
    expect(integerParsedValue).toBe(100);

    const decimalParsedValue = deserializeFromQueryString("10.45");
    expect(decimalParsedValue).toBe(10.45);

    const stringWithNumberParsedValue = deserializeFromQueryString("100ff");
    expect(stringWithNumberParsedValue).not.toBe(100);
  });

  test("deserializes 'string' type correctly", () => {
    const parsedValue = deserializeFromQueryString("hello world");
    expect(parsedValue).toBe("hello world");
  });

  test("deserializes 'boolean' type correctly", () => {
    expect(deserializeFromQueryString("false")).toBe(false);
    expect(deserializeFromQueryString("true")).toBe(true);
  });

  test("deserializes 'Set' type correctly", () => {
    const numberSet = deserializeFromQueryString("{1,2,3}");
    expect(numberSet).toEqual(new Set([1, 2, 3]));

    const stringSet = deserializeFromQueryString("{value1,value2}");
    expect(stringSet).toEqual(new Set(["value1", "value2"]));
  });

  test("deserializes 'RangeFilter' type correctly", () => {
    const correctRangeSerializationResult = deserializeFromQueryString("10-20");
    expect(correctRangeSerializationResult).toEqual({ start: 10, end: 20 });
  });
});
