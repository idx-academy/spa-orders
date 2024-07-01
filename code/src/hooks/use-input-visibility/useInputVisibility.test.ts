import { act, renderHook } from "@testing-library/react";
import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";

describe("useInputVisibility custom hook", () => {
  test("should use input visibility", () => {
    const { result } = renderHook(() => useInputVisibility());

    expect(result.current.showInputText).toBe(false);
    expect(typeof result.current.inputVisibility).toBe("object");
  });

  test("should toggle input visibility after click", () => {
    const { result } = renderHook(() => useInputVisibility());

    act(() => {
      result.current.inputVisibility.endAdornment.props.children.props.onClick();
    });
    expect(result.current.showInputText).toBe(true);

    act(() => {
      result.current.inputVisibility.endAdornment.props.children.props.onClick();
    });
    expect(result.current.showInputText).toBe(false);
  });
});
