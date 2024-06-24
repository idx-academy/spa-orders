import { renderHook, act } from "@testing-library/react";
import useIntroBanner from "@/layouts/intro-banner/useIntroBanner";
import { introBannerImages } from "@/layouts/intro-banner/IntroBanner.constants";

describe("useIntroBanner", () => {
  test("renders useIntroBanner correctly with 100ms delay", async () => {
    const timeTick = 100;
    const timer = jest.useFakeTimers();

    const { result } = renderHook(() =>
      useIntroBanner(introBannerImages.length, timeTick)
    );

    act(() => {
      timer.advanceTimersByTime(timeTick);
    });

    expect(result.current).toBe(1);
  });
});
