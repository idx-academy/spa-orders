import { render, screen } from "@testing-library/react";
import AppLink from "@/components/app-link/AppLink";
import { BrowserRouter } from "react-router-dom";

describe("AppLink", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <AppLink to="/">Test link</AppLink>
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
