import { render, screen } from "@testing-library/react";

import { mockOrders } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";

describe("OrdersTableBody", () => {
  test("renders order information correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <OrdersTableBody onStatusChange={() => {}} order={mockOrders[0]} />
          </tr>
        </tbody>
      </table>
    );

    const ordersId = screen.getByText(mockOrders[0].id);
    const ordersReceiver = screen.getByText(
      `${mockOrders[0].receiver.firstName} ${mockOrders[0].receiver.lastName}`
    );
    const doneIcon = screen.getByTestId(/DoneIcon/);

    expect(doneIcon).toBeInTheDocument();
    expect(ordersId).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });
});
