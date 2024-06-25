import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CallToAction from "@/layouts/call-to-action/CallToAction";

describe("CallToAction", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );

    const titles = screen.getAllByText(/callToActionSection\..+\.title/);
    expect(titles).toHaveLength(2);
  });
});
