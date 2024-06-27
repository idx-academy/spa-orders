import { screen } from "@testing-library/react";
import CallToAction from "@/layouts/call-to-action/CallToAction";
import { renderWithProviders } from "@/utils/test-utils";

describe("CallToAction", () => {
  test("renders correctly", () => {
    renderWithProviders(<CallToAction />);

    const titles = screen.getAllByText(/callToAction\..+\.title/);
    expect(titles).toHaveLength(2);
  });
});
