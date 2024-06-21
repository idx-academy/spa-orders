import { screen, render } from "@testing-library/react";
import AppHeader from "@/layouts/app-header/AppHeader";

test("renders Header and Categories components", () => {
  render(<AppHeader />);
  expect(screen.getByText("login.label")).toBeInTheDocument();
});
