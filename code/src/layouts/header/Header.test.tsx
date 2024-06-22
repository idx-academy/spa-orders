import { screen, render } from "@testing-library/react";
import Header from "@/layouts/header/Header";

test("renders Header correctly", () => {
  render(<Header />);
  expect(screen.getByText("login.label")).toBeInTheDocument();
});
