import { act, renderHook } from "@testing-library/react";

import useIntervalSwitcher from "@/hooks/use-interval-switcher/useIntervalSwitcher";

const timeTick = 100;
const length = 3;

describe("useIntervalSwitcher", () => {
  test("renders useIntervalSwitcher correctly with 100ms delay", () => {
    const timer = jest.useFakeTimers();

    const { result } = renderHook(() => useIntervalSwitcher(length, timeTick));

    act(() => {
      timer.advanceTimersByTime(timeTick);
    });

    expect(result.current).toBe(1);
  });

  test("clears interval on unmount", () => {
    jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => useIntervalSwitcher(length));
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
