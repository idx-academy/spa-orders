import { fireEvent, screen, waitFor } from "@testing-library/react";
import AppLink from "@/components/app-link/AppLink";
import { renderWithProviders } from "@/utils/test-utils";

describe("AppLink", () => {
  test("renders correctly", () => {
    renderWithProviders(<AppLink to="/">Test link</AppLink>);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  test("adds active class when link's pathname is equal to location pathname", async () => {
    renderWithProviders(
      <>
        <AppLink to="/test1" isNavLink>
          Link1
        </AppLink>
        <AppLink to="/test2" isNavLink>
          Link2
        </AppLink>
      </>,
      { initialEntries: ["/test1"] }
    );

    const link1 = screen.getByText("Link1");
    expect(link1).toHaveClass("spa-link--active");

    const link2 = screen.getByText("Link2");
    fireEvent.click(link2);

    await waitFor(() => {
      expect(link2).toHaveClass("spa-link--active");
      expect(link1).not.toHaveClass("spa-link--active");
    });
  });
});
