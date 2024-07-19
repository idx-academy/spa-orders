import { render, screen } from "@testing-library/react";

import ProductsTableHead from "@/containers/tables/products-table/components/products-table-head/ProductsTableHead";

describe("Test ProductsTableHead", () => {
  test("Should be rendered correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <ProductsTableHead head="head" />
          </tr>
        </tbody>
      </table>
    );

    const headElement = screen.getByText("head");
    expect(headElement).toBeInTheDocument();
  });
});
