import { act, renderHook } from "@testing-library/react";

import useIntervalSwitcher from "@/hooks/use-interval-switcher/useIntervalSwitcher";

describe("useIntervalSwitcher", () => {
  test("renders useIntervalSwitcher correctly with 100ms delay", async () => {
    const timeTick = 100;
    const length = 3;
    const timer = jest.useFakeTimers();

    const { result } = renderHook(() => useIntervalSwitcher(length, timeTick));

    act(() => {
      timer.advanceTimersByTime(timeTick);
    });

    expect(result.current).toBe(1);
  });
});
