import { screen } from "@testing-library/react";
import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";
import { renderWithProviders } from "@/utils/test-utils";

describe("HeaderToolbar", () => {
  test("renders the logo", () => {
    renderWithProviders(<HeaderToolbar />);

    const logo = screen.getByAltText("App logo");
    expect(logo).toBeInTheDocument();
  });
});
