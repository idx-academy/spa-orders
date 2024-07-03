import { screen } from "@testing-library/react";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import Footer from "@/layouts/footer/Footer";

describe("Test Footer component", () => {
  beforeEach(() => {
    renderWithProviders(<Footer />);
  });

  test("Should render footer component", () => {
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("Should render three sections and links lists", () => {
    const sections = screen.getAllByRole("heading");
    const lists = screen.getAllByRole("list");

    expect(sections.length).toBe(3);
    expect(lists.length).toBe(4);
  });

  test("Should render correct number of items in each group", () => {
    const locationItems = screen.getAllByText(/footer.location/);
    expect(locationItems.length).toBe(5);

    const socialLinks = screen.getAllByTestId(/Icon/);
    expect(socialLinks.length).toBe(4);

    const customerSupportItems = screen.getAllByText(/footer.support/);
    expect(customerSupportItems.length).toBe(3);

    const policyItems = screen.getAllByText(/footer.policy/);
    expect(policyItems.length).toBe(5);
  });
});
