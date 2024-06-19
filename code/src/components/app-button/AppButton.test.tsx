import { render, screen } from "@testing-library/react";
import AppButton from "@/components/app-button/AppButton";

describe("AppButton", () => {
  test("renders without crashing", () => {
    render(<AppButton>Test Button</AppButton>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("is disabled when isLoading is true", () => {
    render(<AppButton isLoading={true}>Test Button</AppButton>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
