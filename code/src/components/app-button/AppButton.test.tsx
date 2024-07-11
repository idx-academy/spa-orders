import { render, screen } from "@testing-library/react";

import AppButton from "@/components/app-button/AppButton";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("AppButton", () => {
  test("renders without crashing", () => {
    render(<AppButton>Test Button</AppButton>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders as NavLink if isNavLink and to props are passed", () => {
    const path = "/example";

    renderWithProviders(
      <AppButton to={path} isNavLink>
        Test Button
      </AppButton>,
      { initialEntries: [path] }
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", path);
  });

  test("is disabled when isLoading is true", () => {
    render(<AppButton isLoading>Test Button</AppButton>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  test("Should show loader circle when isLoading is true", () => {
    render(<AppButton isLoading>Test Button</AppButton>);
    const loaderElement = screen.getByRole("progressbar");

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass("spa-loader");
  });
});
