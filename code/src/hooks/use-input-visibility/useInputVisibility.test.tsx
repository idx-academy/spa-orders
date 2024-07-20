import { fireEvent, screen } from "@testing-library/react";

import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

type HookPlaygroundProps = {
  isError?: boolean;
};

const HookPlayground = ({ isError }: HookPlaygroundProps) => {
  const { inputVisibility } = useInputVisibility(
    isError ? { isError } : undefined
  );
  return inputVisibility.endAdornment;
};

const errorClassName = "spa-visibility-icon--error";

describe("useInputVisibility custom hook", () => {
  test("toggles adornment correctly", () => {
    renderWithProviders(<HookPlayground />);

    const visibilityButton = screen.getByTestId("visibility-button");
    fireEvent.click(visibilityButton);

    const visabilityOffIcon = screen.getByTestId("VisibilityIcon");
    expect(visabilityOffIcon).toBeInTheDocument();
    expect(visabilityOffIcon).not.toHaveClass(errorClassName);

    fireEvent.click(visibilityButton);

    const visabilityOnIcon = screen.getByTestId("VisibilityOffIcon");
    expect(visabilityOnIcon).toBeInTheDocument();
    expect(visabilityOffIcon).not.toHaveClass(errorClassName);
  });

  test("attaches error class to icons if isError is true", () => {
    renderWithProviders(<HookPlayground isError />);

    const visabilityOnIcon = screen.getByTestId("VisibilityOffIcon");
    expect(visabilityOnIcon).toHaveClass(errorClassName);

    const visibilityButton = screen.getByTestId("visibility-button");
    fireEvent.click(visibilityButton);

    const visabilityOffIcon = screen.getByTestId("VisibilityIcon");
    expect(visabilityOffIcon).toHaveClass(errorClassName);
  });
});
