import { screen } from "@testing-library/react";

import AppCheckbox from "@/components/app-checkbox/AppCheckbox";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("AppCheckbox", () => {
  test("Should render label with translation if labelTranslationKey is passed", () => {
    renderWithProviders(<AppCheckbox labelTranslationKey="translation.key" />);

    const checkbox = screen.getByLabelText("translation.key");
    expect(checkbox).toBeInTheDocument();
  });

  test("Should render label without translation if no labelTranslationKey is passed", () => {
    renderWithProviders(<AppCheckbox label="test-label" />);

    const checkbox = screen.getByLabelText("test-label");
    expect(checkbox).toBeInTheDocument();
  });
});
