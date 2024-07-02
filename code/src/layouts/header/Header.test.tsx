import { screen } from "@testing-library/react";
import Header from "@/layouts/header/Header";
import { renderWithProviders } from "@/utils/test-utils";

// @TODO: remove or move this mock
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: "0px",
  thresholds: []
}));

test("renders Header correctly", () => {
  renderWithProviders(<Header />);

  const signInLabel = screen.getByText("signIn.label");
  expect(signInLabel).toBeInTheDocument();
});
