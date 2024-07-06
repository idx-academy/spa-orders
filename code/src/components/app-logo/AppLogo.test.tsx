import { render, screen } from "@testing-library/react";

import AppLogo from "@/components/app-logo/AppLogo";

describe("AppLogo", () => {
  test("renders correctly", () => {
    render(<AppLogo />);
    const logo = screen.getByAltText("App logo");
    expect(logo).toBeInTheDocument();
  });
});
