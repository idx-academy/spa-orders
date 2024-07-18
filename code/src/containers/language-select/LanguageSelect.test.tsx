import { act, fireEvent, screen } from "@testing-library/react";

import LanguageSelect from "@/containers/language-select/LanguageSelect";

import locales from "@/constants/locales";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("LanguageSelect", () => {
  let select: HTMLElement;
  beforeEach(() => {
    renderWithProviders(<LanguageSelect />);
    select = screen.getByRole("combobox");
  });
  test("renders without crashing", () => {
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
});
