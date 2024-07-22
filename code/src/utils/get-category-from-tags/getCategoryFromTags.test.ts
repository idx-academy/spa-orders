import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";

describe("Test getCategoryFromTags", () => {
  test("should return category tag", () => {
    const result = getCategoryFromTags(["tag", "some-tag"]);

    expect(result).toBeUndefined();
  });

  test("should return undefined if category tag is not found", () => {
    const result = getCategoryFromTags(["category:computers", "some-tag"]);

    expect(result).toBe("computers");
  });
});
