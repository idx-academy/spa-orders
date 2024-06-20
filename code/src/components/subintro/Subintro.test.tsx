import { render, screen } from "@testing-library/react";
import Subintro from "@/components/subintro/Subintro";
import subintroData from "@/components/subintro/Subintro.constants";
jest.mock("@/assets/images/subintro/moped-icon.jpg", () => {});
jest.mock("@/assets/images/subintro/box-icon.jpg", () => {});
jest.mock("@/assets/images/subintro/percent-icon.jpg", () => {});
jest.mock("@/assets/images/subintro/clock-icon.jpg", () => {});

describe("Subintro Component", () => {
  test("render all subintro elements correctly", () => {
    render(<Subintro />);
    const subintroItems = screen.getAllByTestId("subintro-item");
    expect(subintroItems).toHaveLength(subintroData.length);
  });
});
