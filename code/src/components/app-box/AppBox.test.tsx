import { render, screen } from "@testing-library/react";

import AppBox from "@/components/app-box/AppBox";

describe("AppBox", () => {
  test("renders AppBox with children", () => {
    render(<AppBox>children</AppBox>);
    const boxElement = screen.getByText("children");
    expect(boxElement).toBeInTheDocument();
  });
});
