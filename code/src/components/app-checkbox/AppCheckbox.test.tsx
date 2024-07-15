import { screen } from "@testing-library/react";

import AppCheckbox from "@/components/app-checkbox/AppCheckbox";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("AppCheckbox", () => {
  test("renders correctly", () => {
    renderWithProviders(<AppCheckbox labelTranslationKey="translation.key" />);

    const checkbox = screen.getByLabelText("translation.key");
    expect(checkbox).toBeInTheDocument();
  });
});
