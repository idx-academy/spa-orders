import { act, renderHook } from "@testing-library/react";

import useScreenSize from "@/utils/check-screen-size/useScreenSize";

describe("useScreenSize", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  it("should return the initial window dimensions", () => {
    const { result } = renderHook(() => useScreenSize());

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it("should update the screen size on window resize", () => {
    const { result } = renderHook(() => useScreenSize());

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
