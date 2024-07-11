import { screen } from "@testing-library/react";

import CallToAction from "@/containers/call-to-action/CallToAction";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("CallToAction", () => {
  test("renders correctly", () => {
    renderWithProviders(<CallToAction />);

    const titles = screen.getAllByText(/callToAction\..+\.title/);
    expect(titles).toHaveLength(2);
  });
});
