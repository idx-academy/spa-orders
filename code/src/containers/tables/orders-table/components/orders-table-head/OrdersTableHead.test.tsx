import { render, screen } from "@testing-library/react";

import OrdersTableHead from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead";

describe("OrderTableHead", () => {
  test("renders correctly", () => {
    render(
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
