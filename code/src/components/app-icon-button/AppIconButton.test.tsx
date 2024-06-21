import { render, screen } from "@testing-library/react";
import AppIconButton from "./AppIconButton";

describe("AppIconButton", () => {
  test("renders correctly", () => {
    render(<AppIconButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
