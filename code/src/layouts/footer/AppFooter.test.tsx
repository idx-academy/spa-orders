import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "@/layouts/footer/Footer";

describe("Test Footer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
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
});
