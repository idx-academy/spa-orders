import { fireEvent, screen } from "@testing-library/react";

import AppDropdownOptions from "@/components/app-dropdown/components/AppDropdownOptions";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockHandleOptionClick = jest.fn();

const options = [
  { value: "mock-value1", label: "mock-option1" },
  { value: "mock-value2", label: "mock-option2" }
];

describe("AppDropdownOptions block", () => {
  beforeEach(() => {
    renderWithProviders(
      <AppDropdownOptions
        options={options}
        handleOptionClick={mockHandleOptionClick}
      />
    );
  });

  test("should render all options", () => {
    options.forEach((option) => {
      const optionLabel = screen.getByText(option.label);

      expect(optionLabel).toBeInTheDocument();
    });
  });

  test("should call handleOptionClick with correct arguments when an option is clicked", () => {
    options.forEach((option) => {
      const optionElement = screen.getByText(option.label);

      fireEvent.click(optionElement);

      expect(mockHandleOptionClick).toHaveBeenCalledWith(
        expect.any(Object),
        option.value,
        option.label
      );
    });

    expect(mockHandleOptionClick).toHaveBeenCalledTimes(options.length);
  });
});
