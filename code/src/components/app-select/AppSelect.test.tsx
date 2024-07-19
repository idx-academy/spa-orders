import { render, screen } from "@testing-library/react";

import AppSelect from "@/components/app-select/AppSelect";
import { AppSelectProps } from "@/components/app-select/AppSelect.types";

const renderComponent = (params?: Partial<AppSelectProps>) => {
  return render(
    <AppSelect labelId="test" {...params}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </AppSelect>
  );
};

describe("AppSelect", () => {
  test("renders with default props", () => {
    renderComponent({ label: "Select an option" });
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  test("Should render label if it is provided", () => {
    renderComponent({ label: "Select an option" });
    const select = screen.getByTestId("spa-select-label");
    expect(select).toBeInTheDocument();
  });

  test("Should not render label if it is not provided", () => {
    renderComponent();
    const select = screen.queryByTestId("spa-select-label");
    expect(select).not.toBeInTheDocument();
  });
});
