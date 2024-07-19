import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

describe("Test isErrorWithStatus", () => {
  test("should return false if it is not an object", () => {
    const result = isErrorWithStatus("error");

    expect(result).toBe(false);
  });

  test("should return false if it is null", () => {
    const result = isErrorWithStatus(null);

    expect(result).toBe(false);
  });

  test("should return false if there is no status property", () => {
    const result = isErrorWithStatus({ data: null });

    expect(result).toBe(false);
  });

  test("should return false if status is not a number", () => {
    const result = isErrorWithStatus({ status: "400" });

    expect(result).toBe(false);
  });

  test("should return true if passed arg is object with status", () => {
    const result = isErrorWithStatus({ status: 500, data: "some data" });

    expect(result).toBe(true);
  });
});
