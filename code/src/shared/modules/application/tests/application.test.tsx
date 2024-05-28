import { render, screen } from "@testing-library/react";
import Application from "@/shared/modules/application/application";

import "@testing-library/jest-dom";

describe("Application", () => {
  test("should render", () => {
    render(<Application>items</Application>);

    expect(screen.getByText("Hello, React with Webpack!")).toBeInTheDocument();
  });
});