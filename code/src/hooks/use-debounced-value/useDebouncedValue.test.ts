import { act, renderHook } from "@testing-library/react";

import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";

const delayMS = 500;

const renderHookWithValue = (value: string, delay?: number) => {
  return renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
    initialProps: { value, delay }
  });
};

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should return the initial value immediately", () => {
    const { result } = renderHookWithValue("initial value");

    expect(result.current).toBe("initial value");
  });

  test("should update the debounced value after the specified delay", () => {
    const { result, rerender } = renderHookWithValue("initial value");

    rerender({ value: "new value", delay: delayMS });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(delayMS);
    });

    expect(result.current).toBe("new value");
  });

  test("should reset the timer if the value changes before the delay", () => {
    const { result, rerender } = renderHookWithValue("initial value");

    rerender({ value: "new value 1", delay: delayMS });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "new value 2", delay: delayMS });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("initial value");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("new value 2");
  });
});
