import { render, screen } from "@testing-library/react";
import AppLoader from "@/components/app-loader/AppLoader";

describe("AppLoader", () => {
  test("renders AppLoader props", () => {
    render(<AppLoader />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });

  test("renders AppLoader with additional class names", () => {
    render(<AppLoader className="custom-class" />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("spa-loader");
    expect(loader).toHaveClass("custom-class");
  });
});
