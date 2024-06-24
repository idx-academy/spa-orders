import { render, screen } from "@testing-library/react";
import Subintro from "@/layouts/subintro/Subintro";
import subintroItem from "@/layouts/subintro/components/SubintroItem";

describe("Subintro section", () => {
  test("renders four subintro elements correctly", () => {
    render(<Subintro />);

    const subintroItems = screen.getAllByTestId("spa-subintro-item");
    expect(subintroItems).toHaveLength(subintroItem.length);
  });
});
