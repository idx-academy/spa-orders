import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

describe("Test isErrorWithStatus", () => {
  test("should return false if it is not an object", () => {
    const res = isErrorWithStatus("error");

    expect(res).toBe(false);
  });

  test("should return false if it is null", () => {
    const res = isErrorWithStatus(null);

    expect(res).toBe(false);
  });

  test("should return false if there is no status property", () => {
    const res = isErrorWithStatus({ data: null });

    expect(res).toBe(false);
  });

  test("should return false if status is not a number", () => {
    const res = isErrorWithStatus("400");

    expect(res).toBe(false);
  });

  test("should return true if passed arg is object with status", () => {
    const res = isErrorWithStatus({ status: 500, data: "some data" });

    expect(res).toBe(true);
  });
});
