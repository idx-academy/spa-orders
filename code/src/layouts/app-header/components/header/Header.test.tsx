import { render, screen } from "@testing-library/react";
import Header from "@/layouts/app-header/components/header/Header";

describe("Header Component", () => {
  test("render the logo", () => {
    render(<Header />);
    
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});
