import { fireEvent, render, screen } from "@testing-library/react";

import HeaderLogoutButton from "@/layouts/header/components/header-buttons/header-logout-button/HeaderLogoutButton";

const mockLogout = jest.fn();

jest.mock("@/hooks/use-logout/useLogout", () => ({
  __esModule: true,
  default: () => mockLogout
}));

describe("HeaderLogoutButton", () => {
  beforeEach(() => {
    render(<HeaderLogoutButton />);
  });

  it("should render the logout button", () => {
    const logoutButton = screen.getByTestId("header-logout-button");
    expect(logoutButton).toBeInTheDocument();
  });

  it("should call the logout function when clicked", () => {
    const logoutButton = screen.getByTestId("header-logout-button");

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
