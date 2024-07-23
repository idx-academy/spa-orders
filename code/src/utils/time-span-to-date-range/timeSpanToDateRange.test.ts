import { TimeSpan } from "@/types/common";
import timeSpanToDateRange from "@/utils/time-span-to-date-range/timeSpanToDateRange";

const testCases = [
  ["yesterday", new Date("2023-07-20T00:00:00Z")],
  ["last-month", new Date("2023-06-21T00:00:00Z")],
  ["last-two-weeks", new Date("2023-07-07T00:00:00Z")],
  ["last-week", new Date("2023-07-14T00:00:00Z")]
];

const mockDate = new Date("2023-07-21T00:00:00Z");

describe("timeSpanToDateRange", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each(testCases)(
    "returns correct date range for %s",
    (timeSpan, expectedStart) => {
      const { start, end } = timeSpanToDateRange(timeSpan as TimeSpan);
      expect(start).toEqual(expectedStart);
      expect(end).toEqual(mockDate);
    }
  );

  test("throws an error for invalid time span", () => {
    expect(() => timeSpanToDateRange("invalid-time-span" as TimeSpan)).toThrow(
      "Invalid time span"
    );
  });
});
