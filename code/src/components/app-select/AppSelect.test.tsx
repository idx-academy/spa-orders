import { render, screen } from "@testing-library/react";

import AppSelect from "@/components/app-select/AppSelect";

describe("AppSelect", () => {
  it("renders with default props", () => {
    render(
      <AppSelect label="Select an option">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </AppSelect>
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });
});
