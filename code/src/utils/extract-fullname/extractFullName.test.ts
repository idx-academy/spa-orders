import extractFullname from "@/utils/extract-fullname/extractFullname";

const userLike = {
  firstName: "John",
  lastName: "Doe"
};

describe("extractFullName", () => {
  test("extracts fullname correctly", () => {
    const result = extractFullname(userLike);
    expect(result).toBe(`John Doe`);
  });
});
