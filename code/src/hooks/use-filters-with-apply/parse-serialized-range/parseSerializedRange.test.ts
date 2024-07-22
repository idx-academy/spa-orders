import parseSerializedRange from "@/hooks/use-filters-with-apply/parse-serialized-range/parseSerializedRange";

describe("parseSerializedRange", () => {
  test("parses range of two integers correctly", () => {
    const expectedRange = { start: 10, end: 20 };

    expect(parseSerializedRange("10-20")).toEqual(expectedRange);
  });

  test("parses range of two floats correctly", () => {
    const expectedRange = { start: 10.25, end: 30.5 };

    expect(parseSerializedRange("10.25-30.5")).toEqual(expectedRange);
  });

  test("returns undefined when values does not match pattern", () => {
    expect(parseSerializedRange("ordered-delivered")).toBeNull();
    expect(parseSerializedRange("")).toBeNull();
  });
});
