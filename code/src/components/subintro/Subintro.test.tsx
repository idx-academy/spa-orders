import { render, screen } from "@testing-library/react";
import Subintro from "@/components/subintro/Subintro";
import subintroData from "@/components/subintro/Subintro.constants";


describe("Subintro Component", () => {
  test("render all subintro elements correctly", () => {
    render(<Subintro />);
    const subintroItems = screen.getAllByTestId("subintro-item");
    expect(subintroItems).toHaveLength(subintroData.length);
  });
});
