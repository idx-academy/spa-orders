import parseSerializedSet from "@/hooks/use-filters-with-apply/parse-serialized-set/parseSerializedSet";

describe("parseSerializedSet", () => {
  test("parses correct serialized set correctly", () => {
    const serializedSet = "{completed,canceled,delivered}";
    const expectedDeserializedSet = new Set([
      "completed",
      "canceled",
      "delivered"
    ]);

    const deserializedSet = parseSerializedSet(serializedSet);
    expect(deserializedSet).toEqual(expectedDeserializedSet);
  });

  test("parses empty serialized set correctly", () => {
    const serializedSet = "{}";
    const expectedDeserializedSet = new Set();

    const deserializedSet = parseSerializedSet(serializedSet);
    expect(deserializedSet).toEqual(expectedDeserializedSet);
  });

  test("parses incorrect set as undefined", () => {
    const serializedValue = "1,2,3,4";

    const deserializedValue = parseSerializedSet(serializedValue);
    expect(deserializedValue).toBeNull();
  });
});
