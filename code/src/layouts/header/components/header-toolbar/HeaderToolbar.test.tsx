import { render, screen } from "@testing-library/react";
import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";

describe("HeaderToolbar", () => {
  test("renders the logo", () => {
    render(<HeaderToolbar />);
    
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});
