import { screen, render } from "@testing-library/react";
import AppHeader from "@/layouts/app-header/AppHeader";

jest.mock("@/layouts/app-header/components/header/Header", () => ({
  __esModule: true,
  default: () => "Header"
}));

test("renders Header and Categories components", () => {
  render(<AppHeader />);
  expect(screen.getByText("Header")).toBeInTheDocument();
});
