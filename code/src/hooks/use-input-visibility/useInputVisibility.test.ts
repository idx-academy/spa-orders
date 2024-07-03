import { act, renderHook } from "@testing-library/react";
import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";

describe("useInputVisibility custom hook", () => {
  test("should use input visibility", () => {
    const { result } = renderHook(() => useInputVisibility());

    expect(result.current.shouldShowInputText).toBe(false);
    expect(result.current.inputVisibility).toHaveProperty("endAdornment");
  });

  test("should toggle input visibility after click", () => {
    const { result } = renderHook(() => useInputVisibility({ isError: true }));

    act(() => {
      result.current.inputVisibility.endAdornment.props.children.props.onClick();
    });
    expect(result.current.shouldShowInputText).toBe(true);

    act(() => {
      result.current.inputVisibility.endAdornment.props.children.props.onClick();
    });
    expect(result.current.shouldShowInputText).toBe(false);
  });
});
