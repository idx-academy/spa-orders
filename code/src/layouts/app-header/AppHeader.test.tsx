import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "@/layouts/app-header/AppHeader";

test("renders Header and Categories components", () => {
  render(
    <BrowserRouter>
      <AppHeader />
    </BrowserRouter>
  );
  expect(screen.getByText("login.label")).toBeInTheDocument();
});
