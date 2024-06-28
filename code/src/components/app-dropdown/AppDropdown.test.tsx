import { screen, fireEvent } from "@testing-library/react";
import AppDropdown from "@/components/app-dropdown/AppDropdown";
import { renderWithProviders } from "@/utils/test-utils";

const mockAppDropdownOnSelect = jest.fn();

const options = [
  { value: "option1", label: "Label 1" },
  { value: "option2", label: "Label 2" }
];

describe("AppDropdown block", () => {
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
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("toggles the dropdown when clicked", () => {
    const dropdown = screen.getByText("Select an option");

    fireEvent.click(dropdown);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });

    fireEvent.click(dropdown);

    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument();
    });
  });

  test("selects an option and calls onSelect", () => {
    const dropdown = screen.getByText("Select an option");

    fireEvent.click(dropdown);

    const optionToSelect = screen.getByText("Label 2");

    fireEvent.click(optionToSelect);

    expect(screen.getByText("Label 2")).toBeInTheDocument();
  });
});
