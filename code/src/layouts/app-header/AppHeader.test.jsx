import { render } from "@testing-library/react";
import AppHeader from "@/layouts/app-header/AppHeader";
import Header from "@/layouts/app-header/components/header/Header";
import Categories from "@/layouts/app-header/components/categories/Categories";

jest.mock("@/layouts/app-header/components/header/Header", () => () => (
  <div>Header</div>
));
jest.mock("@/layouts/app-header/components/categories/Categories", () => () => (
  <div>Categories</div>
));

test("renders Header and Categories components", () => {
  const { getByText } = render(<AppHeader />);

  expect(getByText("Header")).toBeInTheDocument();
  expect(getByText("Categories")).toBeInTheDocument();
});
