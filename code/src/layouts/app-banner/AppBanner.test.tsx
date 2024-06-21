import { render, screen } from "@testing-library/react";
import AppBanner from "@/layouts/app-banner/AppBanner";

describe("AppBanner", () => {
  test("should render AppBanner component", () => {
    render(<AppBanner />);
    const headerText = screen.getByText("appBanner.header");
    expect(headerText).toBeInTheDocument();
  });
});
