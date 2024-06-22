import { screen, render } from "@testing-library/react";
import Header from "@/layouts/header/Header";
import { MemoryRouter } from "react-router-dom";

test("renders Header correctly", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("login.label")).toBeInTheDocument();
});
