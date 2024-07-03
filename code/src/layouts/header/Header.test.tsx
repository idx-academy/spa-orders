import { screen } from "@testing-library/react";
import Header from "@/layouts/header/Header";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/layouts/header/components/header-toolbar/HeaderToolbar", () => ({
  __esModule: true,
  default: () => <div>Test</div>
}));

// // @TODO: remove or move this mock
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

  const headerToolbarContent = screen.getByText("Test");
  expect(headerToolbarContent).toBeInTheDocument();
});
