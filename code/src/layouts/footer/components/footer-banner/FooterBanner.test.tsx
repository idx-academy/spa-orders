import { render, screen } from "@testing-library/react";

import FooterBanner from "@/layouts/footer/components/footer-banner/FooterBanner";

describe("FooterBanner", () => {
  test("renders FooterBanner correctly", () => {
    render(<FooterBanner />);

    const title = screen.getByText(/footer.banner.title/);

    expect(title).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /footer.banner.button/ });
    expect(button).toBeInTheDocument();
  });
});
