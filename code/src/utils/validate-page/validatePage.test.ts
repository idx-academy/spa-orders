import validatePage from "@/utils/validate-page/validatePage";

describe("Test validatePage util", () => {
  test("Should return passed number value when it is valid", () => {
    const stringRes = validatePage("4");
    const numberRes = validatePage(4);

    expect(stringRes).toBe(4);
    expect(numberRes).toBe(4);
  });

  test("Should return 1 for invalid values", () => {
    const invalidObj = validatePage({});
    const invalidString = validatePage("dfs");
    const invalidNan = validatePage(NaN);

    expect(invalidObj).toBe(1);
    expect(invalidString).toBe(1);
    expect(invalidNan).toBe(1);
  });
});
