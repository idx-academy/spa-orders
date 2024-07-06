import { render, screen } from "@testing-library/react";

import AppLoader from "@/components/app-loader/AppLoader";

describe("AppLoader", () => {
  test("renders AppLoader props", () => {
    render(<AppLoader />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });
});
