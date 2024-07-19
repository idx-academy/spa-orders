import createUrlPath from "@/utils/create-url-path/createUrlPath";

const baseUrl = "https://www.google.com";
const resourcePath = "products";
const expectedUrl = "https://www.google.com/products";

describe("createUrlPath", () => {
  test("should join base URL without trailing slash and resource path without trailing slash correctly", () => {
    expect(createUrlPath(baseUrl, resourcePath)).toBe(expectedUrl);
  });

  test("should join base URL with trailing slash and resource path without trailing slash correctly", () => {
    expect(createUrlPath(`${baseUrl}/`, resourcePath)).toBe(expectedUrl);
  });

  test("should join base URL without trailing slash and resource path with multiple trailing slashes correctly", () => {
    expect(createUrlPath(baseUrl, `//${resourcePath}`)).toBe(expectedUrl);
  });

  test("should not replace trailing slash at the end of resource path", () => {
    expect(createUrlPath(baseUrl, `${resourcePath}/`)).toBe(`${expectedUrl}/`);
  });

  test("should join base URL and resource path if both have trailing slashes correctly", () => {
    expect(createUrlPath(`${baseUrl}/`, `/${resourcePath}`)).toBe(expectedUrl);
  });

  test("should join base URL with query parameters correctly", () => {
    const query = { key1: "value1", key2: "value2" };

    const expectedUrlWithQuery = `${baseUrl}?key1=value1&key2=value2`;
    expect(createUrlPath(baseUrl, "", query)).toBe(expectedUrlWithQuery);
  });

  test("should join base URL, resource path, and query parameters correctly", () => {
    const query = { key1: "value1", key2: "value2" };
    const expectedUrlWithQuery = `${baseUrl}/products?key1=value1&key2=value2`;
    expect(createUrlPath(baseUrl, resourcePath, query)).toBe(
      expectedUrlWithQuery
    );
  });

  test("should handle empty query parameters correctly", () => {
    const query = { key1: "", key2: "value2" };
    const expectedUrlWithQuery = `${baseUrl}?key1=&key2=value2`;
    expect(createUrlPath(baseUrl, "", query)).toBe(expectedUrlWithQuery);
  });

  test("should handle undefined query parameter values correctly", () => {
    const query = { key1: undefined, key2: "value2" };
    const expectedUrlWithQuery = `${baseUrl}?key2=value2`;
    expect(createUrlPath(baseUrl, "", query)).toBe(expectedUrlWithQuery);
  });
});
