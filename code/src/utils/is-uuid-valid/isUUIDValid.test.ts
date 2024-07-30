import isUuidValid from "@/utils/is-uuid-valid/isUUIDValid";

const testData = [
  { uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479", expected: true },
  { uuid: "not-a-uuid", expected: false },
  { uuid: "", expected: false },
  { uuid: null, expected: false }
];

describe("isUuidValid", () => {
  test.each(testData)(
    "Should return $expected for $uuid",
    ({ uuid, expected }) => {
      const result = isUuidValid(uuid);
      expect(result).toBe(expected);
    }
  );
});
