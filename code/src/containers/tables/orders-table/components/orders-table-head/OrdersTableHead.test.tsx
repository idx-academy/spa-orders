import { render, screen } from "@testing-library/react";

import OrdersTableHead from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("OrderTableHead", () => {
  test("renders correctly", () => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <OrdersTableHead head="test" />
          </tr>
        </tbody>
      </table>
    );

    const headElement = screen.getByText(/test/);
    expect(headElement).toBeInTheDocument();
  });
});
