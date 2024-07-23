import serializeToQueryString from "@/hooks/use-filters-with-apply/serialize-to-query-string/serializeToQueryString";

const mockSet = new Set(["value1", "value2"]);

describe("serializeToQueryString", () => {
  test("serializes null correctly", () => {
    const serializationResult = serializeToQueryString(null);
    expect(serializationResult).toBe("null");
  });

  test("serializes 'number' type correctly", () => {
    const serializationResult = serializeToQueryString(1);
    expect(serializationResult).toBe("1");
  });

  test("serializes 'string' type correctly", () => {
    const serializationResult = serializeToQueryString("hello world");
    expect(serializationResult).toBe("hello world");
  });

  test("serializes 'boolean' type correctly", () => {
    expect(serializeToQueryString(false)).toBe("false");
    expect(serializeToQueryString(true)).toBe("true");
  });

  test("serializes 'Set' type correctly", () => {
    const serializationResult = serializeToQueryString(mockSet);

    expect(serializationResult).toBe("{value1,value2}");
  });

  test("serializes 'RangeFilter' type correctly", () => {
    const correctRangeSerializationResult = serializeToQueryString({
      start: 10,
      end: 20
    });
    expect(correctRangeSerializationResult).toBe("10-20");
  });

  test("throws an error if type is object, but neither 'Set' nor 'RangeFilter'", () => {
    expect(() => serializeToQueryString({ start: 10 })).toThrow();
    expect(() => serializeToQueryString({ end: 10 })).toThrow();
    expect(() => serializeToQueryString(new Map())).toThrow();
    expect(() => serializeToQueryString({})).toThrow();
  });

  test("throws an error if type if typeof value is not number, string, boolean or object and is not null", () => {
    expect(() => serializeToQueryString(undefined)).toThrow();
  });
});
