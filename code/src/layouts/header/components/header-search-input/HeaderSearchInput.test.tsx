import { fireEvent, render, screen } from "@testing-library/react";

import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

import HeaderSearchInput from "@/layouts/header/components/header-search-input/HeaderSearchInput";

describe("Test HeaderSearchInput", () => {
  beforeEach(() => {
    render(<HeaderSearchInput />);
  });

  test("renders search field", () => {
    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();
  });

  test("changes input value", async () => {
    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    await typeIntoInput(searchField, "test");

    expect(searchField).toHaveValue("test");
  });

  test("clears input value when clear button is clicked", async () => {
    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    const clearButton = screen
      .getByTestId("ClearIcon")
      .closest("button") as HTMLButtonElement;

    await typeIntoInput(searchField, "Hello!");
    expect(searchField).toHaveValue("Hello!");

    fireEvent.click(clearButton);
    expect(searchField).toHaveValue("");
  });
});
