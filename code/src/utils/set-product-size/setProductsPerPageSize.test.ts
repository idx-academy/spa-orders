import setProductsPerPageSize from "@/utils/set-product-size/setProductsPerPageSize";

describe("Set products per page size test", () => {
  test("Returns 10 items if width equal or over 1536", () => {
    expect(setProductsPerPageSize(1536)).toEqual(10);
  });
  test("Returns 12 items if width equal or over 1200", () => {
    expect(setProductsPerPageSize(1200)).toEqual(12);
  });
  test("Returns 9 items if width equal or over 900", () => {
    expect(setProductsPerPageSize(900)).toEqual(9);
  });
  test("Returns 10 items if screen width less than 900", () => {
    expect(setProductsPerPageSize(899)).toEqual(10);
  });
});
