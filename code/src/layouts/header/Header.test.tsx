import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import Header from "@/layouts/header/Header";

test("renders Header correctly", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("login.label")).toBeInTheDocument();
});
