import { render, screen } from "@testing-library/react";

import AppContainer from "@/components/app-container/AppContainer";

describe("AppBox", () => {
  test("renders AppContainer with children", () => {
    render(<AppContainer>children</AppContainer>);
    const boxElement = screen.getByText("children");
    expect(boxElement).toBeInTheDocument();
  });
});
