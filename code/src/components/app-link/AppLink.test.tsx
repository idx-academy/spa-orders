import { render, screen } from "@testing-library/react";
import AppLink from "@/components/app-link/AppLink";

describe("AppLink", () => {
  test("renders correctly", () => {
    render(<AppLink to="/">Test link</AppLink>);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
