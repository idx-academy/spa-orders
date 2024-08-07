import { screen } from "@testing-library/react";

import Header from "@/layouts/header/Header";

import renderWithProviders, {
  setupMockIntersectionObserver
} from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/layouts/header/components/header-toolbar/HeaderToolbar", () => ({
  __esModule: true,
  default: () => <div>Test</div>
}));

test("renders Header correctly", () => {
  setupMockIntersectionObserver();
  renderWithProviders(<Header />);

  const headerToolbarContent = screen.getByText("Test");
  expect(headerToolbarContent).toBeInTheDocument();
});
