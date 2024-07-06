import { render, screen } from "@testing-library/react";

import Subintro from "@/layouts/subintro/Subintro";
import subintroElements from "@/layouts/subintro/Subintro.constants";

describe("Subintro section", () => {
  test("renders four subintro elements correctly", () => {
    render(<Subintro />);

    const subintroItems = screen.getAllByTestId("spa-subintro-item");
    expect(subintroItems).toHaveLength(subintroElements.length);
  });
});
