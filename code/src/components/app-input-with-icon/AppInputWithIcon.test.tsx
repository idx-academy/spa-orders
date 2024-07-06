import { fireEvent, render, screen } from "@testing-library/react";

import AppInputWithIcon from "@/components/app-input-with-icon/AppInputWithIcon";

const handleClear = jest.fn();
const handleSearch = jest.fn();

describe("AppInputWithIcon ", () => {
  beforeEach(() => {
    render(
      <AppInputWithIcon
        placeholder="Search..."
        onClear={handleClear}
        onSearch={handleSearch}
        value="test"
      />
    );
  });
  test("Should render search input field", () => {
    const searchInputField = screen.getByPlaceholderText("Search...");
    expect(searchInputField).toBeInTheDocument();
  });

  test("Should render search icon button", () => {
    const searchButton = screen.getByTestId(/SearchIcon/);
    expect(searchButton).toBeInTheDocument();
  });

  test("Should render clear icon button when there is a value", () => {
    const clearButton = screen.getByTestId(/ClearIcon/i);
    expect(clearButton).toBeInTheDocument();
  });

  test("Should call onSearch when search button is clicked", () => {
    const searchButton = screen.getByTestId(/SearchIcon/);
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalled();
  });

  test("Should call onClear when clear button is clicked", () => {
    const clearButton = screen.getByTestId(/ClearIcon/i);
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalled();
  });
});

describe("AppInputWithIcon with empty value", () => {
  beforeEach(() => {
    render(
      <AppInputWithIcon
        placeholder="Search..."
        onClear={handleClear}
        onSearch={handleSearch}
      />
    );
  });

  test("Should not render clear icon button when there is no value", () => {
    const clearButton = screen.getAllByRole("button")[0];
    expect(clearButton).toHaveClass("spa-search-input__clear-icon");
  });
});
