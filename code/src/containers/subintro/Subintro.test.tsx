import { render, screen } from "@testing-library/react";

import Subintro from "@/containers/subintro/Subintro";
import subintroElements from "@/containers/subintro/Subintro.constants";

describe("Subintro section", () => {
  test("renders four subintro elements correctly", () => {
    render(<Subintro />);

    const subintroItems = screen.getAllByTestId("spa-subintro-item");
    expect(subintroItems).toHaveLength(subintroElements.length);
  });
});
