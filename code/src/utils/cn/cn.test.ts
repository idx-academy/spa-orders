import cn from "@/utils/cn/cn";

describe("Test cn function", () => {
  test("should return empty string if no arguments are provided", () => {
    expect(cn()).toBe("");
  });

  test("should return one class if only one argument is valid", () => {
    const result = cn("class", "", () => {});

    expect(result).toBe("class");
  });

  test("should return multiple classes separated by spaces if all of them are valid", () => {
    const result = cn("class1", "class2", "class3");

    expect(result).toBe("class1 class2 class3");
  });
});
