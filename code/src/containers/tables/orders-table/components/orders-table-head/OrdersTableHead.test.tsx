import { render, screen } from "@testing-library/react";

import OrdersTableHead from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead";

const mockOnSortChange = jest.fn();

describe("OrderTableHead", () => {
  test("renders correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <OrdersTableHead head="test" onSortChange={mockOnSortChange} />
          </tr>
        </tbody>
      </table>
    );

    const headElement = screen.getByText(/test/);
    expect(headElement).toBeInTheDocument();
  });
});
