import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import LanguageSelect from "@/containers/language-select/LanguageSelect";

import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import locales from "@/constants/locales";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.spyOn(Storage.prototype, "setItem");

describe("LanguageSelect", () => {
  let select: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<LanguageSelect />);
    select = screen.getByRole("combobox");
  });

  test("renders correctly", () => {
    expect(select).toHaveClass("language-select");
    expect(select).toBeInTheDocument();
  });

  test("changes locale on selecting a different language", async () => {
    fireEvent.mouseDown(select);

    const optionText = locales[1].translationKey;
    const optionToSelect = screen.getByRole("option", { name: optionText });

    act(() => {
      fireEvent.click(optionToSelect);
    });

    expect(optionToSelect).toBeInTheDocument();
  });

  test("changes locale on selecting a different language", async () => {
    fireEvent.mouseDown(select);

    const optionText = locales[1].translationKey;
    const optionToSelect = screen.getByRole("option", { name: optionText });

    fireEvent.click(optionToSelect);

    await waitFor(() => {
      const defaultOption = screen.queryByText(locales[0].translationKey);
      expect(defaultOption).not.toBeInTheDocument();
    });

    const displayedLanguage = screen.getByText(optionText);
    expect(displayedLanguage).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.locale,
      locales[1].key
    );
  });
});
