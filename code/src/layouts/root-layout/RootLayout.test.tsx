import { screen } from "@testing-library/react";

import RootLayout from "@/layouts/root-layout/RootLayout";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/layouts/header/Header", () => jest.fn(() => <div>Header</div>));
jest.mock("@/layouts/footer/Footer", () => jest.fn(() => <div>Footer</div>));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: jest.fn(() => <div>Outlet</div>),
  ScrollRestoration: jest.fn(() => <div>ScrollRestoration</div>)
}));

describe("RootLayout", () => {
  test("renders correctly", () => {
    renderWithProviders(<RootLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("ScrollRestoration")).toBeInTheDocument();
    expect(screen.getByText("Outlet")).toBeInTheDocument();
  });
});
