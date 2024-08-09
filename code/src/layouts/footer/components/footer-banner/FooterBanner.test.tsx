import { screen } from "@testing-library/react";

import FooterBanner from "@/layouts/footer/components/footer-banner/FooterBanner";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("FooterBanner", () => {
  test("renders FooterBanner correctly", () => {
    renderWithProviders(<FooterBanner />);

    const title = screen.getByText(/footer.banner.title/);

    expect(title).toBeInTheDocument();

    const button = screen.getByRole("link", { name: /footer.banner.button/ });
    expect(button).toBeInTheDocument();
  });
});
