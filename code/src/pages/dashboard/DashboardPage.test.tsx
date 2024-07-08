import { render, screen } from "@testing-library/react";

import DashboardPage from "@/pages/dashboard/DashboardPage";

describe("DashboardPage", () => {
  test("renders correctly", () => {
    render(<DashboardPage />);

    const content = screen.getByText("Dashboard page");
    expect(content).toBeInTheDocument();
  });
});
