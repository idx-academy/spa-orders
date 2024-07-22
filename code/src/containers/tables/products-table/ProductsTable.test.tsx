import { render, screen } from "@testing-library/react";

import ProductsTable from "@/containers/tables/products-table/ProductsTable";
import {
  mockProducts,
  productsTableColumns
} from "@/containers/tables/products-table/ProductsTable.constants";

describe("Test ProductsTable", () => {
  test("Should be rendered correctly", () => {
    const { container } = render(<ProductsTable products={mockProducts} />);

    productsTableColumns
      .filter((item) => item)
      .forEach((columnTitle) => {
        const columnElement = screen.getByText(columnTitle);
        expect(columnElement).toBeInTheDocument();
      });

    const tableCells = screen.getAllByRole("cell");

    const bodyElement = container.querySelector(".products-table__body");
    const containerElement = container.querySelector(".products-table");

    expect(tableCells.length).toBe(8 * 2);
    expect(bodyElement).toBeInTheDocument();
    expect(containerElement).toBeInTheDocument();
  });

  test("Should render fallback", () => {
    render(<ProductsTable products={[]} />);

    const fallbackText = screen.getByText(/productsTable.fallback/);
    expect(fallbackText).toBeInTheDocument();

    const fallBackContainer = screen.getByTestId("table-fallback");
    expect(fallBackContainer).toHaveClass("products-table__fallback");
  });
});
