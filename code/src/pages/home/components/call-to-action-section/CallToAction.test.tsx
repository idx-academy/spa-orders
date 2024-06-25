import { render, screen } from "@testing-library/react";
import CallToActionSection from "@/pages/home/components/call-to-action-section/CallToActionSection";
import { MemoryRouter } from "react-router-dom";

describe("CallToAction", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <CallToActionSection />
      </MemoryRouter>
    );

    const titles = screen.getAllByText(/callToActionSection\..+\.title/);
    expect(titles).toHaveLength(2);
  });
});
