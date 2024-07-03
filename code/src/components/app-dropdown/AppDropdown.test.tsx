import { screen } from "@testing-library/react";
import AppDropdown from "@/components/app-dropdown/AppDropdown";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockAppDropdownOnSelect = jest.fn();

const options = [
  { value: "option1", label: "Label 1" },
  { value: "option2", label: "Label 2" }
];

describe("AppDropdown", () => {
  beforeEach(() => {
    renderWithProviders(
      <AppDropdown
        options={options}
        onSelect={mockAppDropdownOnSelect}
        defaultLabel="Select an option"
        className="test-dropdown"
      />
    );
  });

  test("renders the default label", () => {
    const selectOption = screen.getByText("Select an option");
    expect(selectOption).toBeInTheDocument();
  });
});
