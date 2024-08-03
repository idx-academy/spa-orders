import { render, screen } from "@testing-library/react";

import AppInputBase from "@/components/app-input-base/AppInputBase";

describe("AppInputBase", () => {
  test("renders correctly", () => {
    render(<AppInputBase placeholder="Test placeholder" />);
    const inputElement = screen.getByPlaceholderText("Test placeholder");
    expect(inputElement).toBeInTheDocument();
  });
});
