import { RenderHookResult, act, renderHook } from "@testing-library/react";

import useDropdown from "@/hooks/use-dropdown/useDropdown";

describe("useDropdown", () => {
  let result: RenderHookResult<ReturnType<typeof useDropdown>, unknown>;

  beforeEach(() => {
    result = renderHook(() => useDropdown());
  });

  test("initializes with isDropdownOpened as false", () => {
    expect(result.result.current.isDropdownOpened).toBe(false);
  });

  test("sets isDropdownOpened to true when handleOpenDropdown is called", () => {
    act(() => {
      result.result.current.handleOpenDropdown();
    });

    expect(result.result.current.isDropdownOpened).toBe(true);
  });

  test("sets isDropdownOpened to false when handleCloseDropdown is called", () => {
    act(() => {
      result.result.current.handleOpenDropdown();
    });

    act(() => {
      result.result.current.handleCloseDropdown();
    });

    expect(result.result.current.isDropdownOpened).toBe(false);
  });

  test("toggles isDropdownOpened to true when initially false", () => {
    act(() => {
      result.result.current.toggleDropdown();
    });

    expect(result.result.current.isDropdownOpened).toBe(true);
  });

  test("toggles isDropdownOpened to false when initially true", () => {
    act(() => {
      result.result.current.handleOpenDropdown();
    });

    act(() => {
      result.result.current.toggleDropdown();
    });

    expect(result.result.current.isDropdownOpened).toBe(false);
  });
});
