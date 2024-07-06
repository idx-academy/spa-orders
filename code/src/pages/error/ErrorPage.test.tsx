import { render, screen } from "@testing-library/react";

import ErrorPage from "@/pages/error/ErrorPage";

jest.mock("react-router-dom", () => ({
  useRouteError: () => "Error occured"
}));

describe("Test ErrorPage", () => {
  test("Should show error text", () => {
    render(<ErrorPage />);

    const errorTextElement = screen.getByText(/Error occured/);

    expect(errorTextElement).toBeInTheDocument();
  });
});
