import parseSerializedSet from "@/hooks/use-filters-with-apply/parse-serialized-set/parseSerializedSet";

const setWithStatuses = new Set(["completed", "canceled", "delivered"]);
const serializedSet = "{completed,canceled,delivered}";

describe("parseSerializedSet", () => {
  test("parses correct serialized set correctly", () => {
    const deserializedSet = parseSerializedSet(serializedSet);
    expect(deserializedSet).toEqual(setWithStatuses);
  });

  test("parses empty serialized set correctly", () => {
    const deserializedSet = parseSerializedSet("{}");
    expect(deserializedSet).toEqual(new Set());
  });

  test("parses incorrect set as undefined", () => {
    const deserializedValue = parseSerializedSet("1,2,3,4");
    expect(deserializedValue).toBeNull();
  });
});
