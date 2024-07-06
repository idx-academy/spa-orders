import { render, screen } from "@testing-library/react";

import AppIconButton from "@/components/app-icon-button/AppIconButton";

describe("AppIconButton", () => {
  test("renders correctly", () => {
    render(<AppIconButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
