import { fireEvent, render, screen } from "@testing-library/react";
import AppInput from "@/components/app-input/AppInput";

describe("AppInput", () => {
  test("Should render regular input field", () => {
    render(<AppInput label="Regular Input" />);
    const regularInputField = screen.getByLabelText("Regular Input");
    expect(regularInputField).toBeInTheDocument();
  });

  test("Should render search input field", () => {
    render(<AppInput variant="search" placeholder="Search..." />);
    const searchInputField = screen.getByPlaceholderText("Search...");
    expect(searchInputField).toBeInTheDocument();
  });

  test("Should render search icon button", () => {
    render(<AppInput variant="search" placeholder="Search..." />);
    const searchButton = screen.getByTestId(/SearchIcon/);
    expect(searchButton).toBeInTheDocument();
  });

  test("Should render clear icon button when there is a value", () => {
    render(<AppInput variant="search" value="test" placeholder="Search..." />);
    const clearButton = screen.getByTestId(/ClearIcon/i);
    expect(clearButton).toBeInTheDocument();
  });

  test("Should call onSearch when search button is clicked", () => {
    const handleSearch = jest.fn();
    render(
      <AppInput
        variant="search"
        placeholder="Search..."
        onSearch={handleSearch}
      />
    );
    const searchButton = screen.getByTestId(/SearchIcon/);
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test("Should call onClear when clear button is clicked", () => {
    const handleClear = jest.fn();
    render(
      <AppInput
        variant="search"
        value="test"
        placeholder="Search..."
        onClear={handleClear}
      />
    );
    const clearButton = screen.getByTestId(/ClearIcon/i);
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
