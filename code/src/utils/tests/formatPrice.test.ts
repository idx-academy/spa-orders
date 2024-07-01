import formatPrice from "@/utils/formatPrice";

describe("formatPrice", () => {
  test("formats price with some option", () => {
    expect(formatPrice(1024)).toBe("$1,024.00");
  });
});
