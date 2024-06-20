import { render, screen } from "@testing-library/react";
import Subintro from "../subintro/Subintro";
import { subintroData } from "../subintro/subintroData";
jest.mock("@/assets/images/subintro/moped-icon.jpg", () => { });
jest.mock("@/assets/images/subintro/box-icon.jpg", () => { });
jest.mock("@/assets/images/subintro/percent-icon.jpg", () => { });
jest.mock("@/assets/images/subintro/clock-icon.jpg", () => { });

describe("Subintro Component", () => {
  test("render number length of subintro elements", () => {
    render(<Subintro />);
    const subintroItems = screen.getAllByTestId("subintro-item");
    expect(subintroItems).toHaveLength(subintroData.length);
  });
});