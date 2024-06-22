import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AppLink from "@/components/app-link/AppLink";

describe("AppLink", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <AppLink to="/">Test link</AppLink>
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  test("adds active class when link's pathname is equal to location pathname", async () => {
    render(
      <MemoryRouter initialEntries={["/test1"]}>
        <AppLink to="/test1" isNavLink>
          Link1
        </AppLink>
        <AppLink to="/test2" isNavLink>
          Link2
        </AppLink>
      </MemoryRouter>
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
