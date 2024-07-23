import parseSerializedRange from "@/hooks/use-filters-with-apply/parse-serialized-range/parseSerializedRange";

const integerRange = { start: 10, end: 20 };
const decimalRange = { start: 10.25, end: 30.5 };

describe("parseSerializedRange", () => {
  test("parses range of two integers correctly", () => {
    expect(parseSerializedRange("10-20")).toEqual(integerRange);
  });

  test("parses range of two floats correctly", () => {
    expect(parseSerializedRange("10.25-30.5")).toEqual(decimalRange);
  });

  test("returns undefined when values does not match pattern", () => {
    expect(parseSerializedRange("ordered-delivered")).toBeNull();
    expect(parseSerializedRange("")).toBeNull();
  });
});
