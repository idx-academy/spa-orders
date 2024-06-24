import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import Header from "@/layouts/header/Header";

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
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const loginLabel = screen.getByText("login.label");
  expect(loginLabel).toBeInTheDocument();
});
