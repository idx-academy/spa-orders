import { fireEvent, render, screen } from "@testing-library/react";

import AppSearchInput from "@/components/app-search-input/AppSearchInput";

const handleClear = jest.fn();
const handleSearch = jest.fn();
const placeholder = "Search...";

describe("AppSearchInput ", () => {
  beforeEach(() => {
    render(
      <AppSearchInput
        placeholder={placeholder}
        onClear={handleClear}
        onSearch={handleSearch}
        value="test"
      />
    );
  });
  test("Should render search input field", () => {
    const searchInputField = screen.getByPlaceholderText(placeholder);
    expect(searchInputField).toBeInTheDocument();
  });

  test("Should render search icon button", () => {
    const searchButton = screen.getByTestId(/SearchIcon/);
    expect(searchButton).toBeInTheDocument();
  });

  test("Should render clear icon button", () => {
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
