import checkWithinRangeSliderRange from "@/components/app-range-slider/utils/check-within-range/checkWithinRange";

const testCases = [
  [10, 0, 20, true],
  [0, 0, 20, true],
  [20, 0, 20, true],
  [-1, 0, 20, false],
  [21, 0, 20, false],
  [0, 0, 20, true],
  [20, 0, 20, true]
] as const;

describe("checkWithinRange", () => {
  test.each(testCases)(
    "returns %s when value is %i, min is %i, and max is %i",
    (value, min, max, expected) => {
      expect(checkWithinRangeSliderRange({ value, min, max })).toBe(expected);
    }
  );
});
