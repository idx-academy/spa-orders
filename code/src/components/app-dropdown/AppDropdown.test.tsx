import { screen, fireEvent } from "@testing-library/react";
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

  it("should render the dropdown with default label", () => {
    const selectedLabel = screen.getByText("Select an option");
    expect(selectedLabel).toBeInTheDocument();
  });

  it("should render the dropdown when default label isn't provided", () => {
    renderWithProviders(
      <AppDropdown
        options={options}
        onSelect={mockAppDropdownOnSelect}
        className="test-dropdown"
      />
    );

    const selectedLabel = screen.getByText("Label 1");
    expect(selectedLabel).toBeInTheDocument();
  });

  it("toggles the dropdown options with onClick", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    const option1 = screen.getByText("Label 1");
    expect(option1).toBeInTheDocument();

    const option2 = screen.getByText("Label 2");
    expect(option2).toBeInTheDocument();

    fireEvent.click(dropdown);

    expect(option1).not.toBeInTheDocument();
    expect(option2).not.toBeInTheDocument();
  });

  it("selects an option and calls onSelect", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    const option1 = screen.getByText("Label 1");

    fireEvent.click(option1);

    expect(mockAppDropdownOnSelect).toHaveBeenCalledWith("option1");

    const selectedLabel = screen.getByText("Label 1");
    expect(selectedLabel).toBeInTheDocument();
  });

  it("closes the dropdown when an option is selected", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    const option1 = screen.getByText("Label 1");

    fireEvent.click(option1);

    const secondLabel = screen.queryByText("Label 2");
    expect(secondLabel).not.toBeInTheDocument();
  });

  it("closes the dropdown when it loses focus", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    fireEvent.blur(dropdown);

    const firstdLabel = screen.queryByText("Label 1");
    expect(firstdLabel).not.toBeInTheDocument();

    const secondLabel = screen.queryByText("Label 2");
    expect(secondLabel).not.toBeInTheDocument();
  });

  it("keeps the dropdown open if focus is still within the dropdown", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    const option1 = screen.getByText("Label 1");

    fireEvent.focus(option1);

    fireEvent.blur(dropdown, { relatedTarget: option1 });
    expect(option1).toBeInTheDocument();
  });

  it("renders the icon correctly based on the dropdown state", () => {
    const dropdown = screen.getByTestId("app-dropdown");

    fireEvent.click(dropdown);

    const upIcon = screen.getByTestId("KeyboardArrowUpIcon");
    expect(upIcon).toBeInTheDocument();

    fireEvent.click(dropdown);

    const downIcon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(downIcon).toBeInTheDocument();
  });
});
