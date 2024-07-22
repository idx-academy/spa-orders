import checkSupportedSerializedFilter from "@/hooks/use-filters-with-apply/check-supported-serialized-filter/checkSupportedSerializedFilter";

describe("checkSupportedType", () => {
  test("returns true for 'number', 'boolean' and 'string' types", () => {
    const numberTest = checkSupportedSerializedFilter(3.14);
    expect(numberTest).toBe(true);

    const stringTest = checkSupportedSerializedFilter("hello world");
    expect(stringTest).toBe(true);

    const booleanTest = checkSupportedSerializedFilter(false);
    expect(booleanTest).toBe(true);
  });

  test("returns true for 'null' value", () => {
    const result = checkSupportedSerializedFilter(null);
    expect(result).toBe(true);
  });

  test("returns true for 'undefined' value", () => {
    const result = checkSupportedSerializedFilter(undefined);
    expect(result).toBe(true);
  });

  test("returns true for 'Set' type", () => {
    const result = checkSupportedSerializedFilter(new Set([1, 2, 3]));
    expect(result).toBe(true);
  });

  test("checks for 'RangeFilter' type correctly", () => {
    const correctRangeResult = checkSupportedSerializedFilter({
      start: 10,
      end: 30
    });
    expect(correctRangeResult).toBe(true);

    const incorrectRangeResult1 = checkSupportedSerializedFilter({ start: 10 });
    expect(incorrectRangeResult1).toBe(false);

    const incorrectRangeResult2 = checkSupportedSerializedFilter({ end: 30 });
    expect(incorrectRangeResult2).toBe(false);
  });

  test("returns false for invalid type", () => {
    const result = checkSupportedSerializedFilter({ name: "Max" });
    expect(result).toBe(false);
  });
});
