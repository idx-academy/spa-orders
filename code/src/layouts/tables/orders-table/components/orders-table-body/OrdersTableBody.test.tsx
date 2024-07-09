import { render, screen } from "@testing-library/react";

import { ordersContent } from "@/layouts/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/layouts/tables/orders-table/components/orders-table-body/OrdersTableBody";

describe("OrdersTableBody", () => {
  test("renders order information correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <OrdersTableBody order={ordersContent[0]} />
          </tr>
        </tbody>
      </table>
    );

    const ordersId = screen.getByText(ordersContent[0].id);
    const ordersReceiver = screen.getByText(
      `${ordersContent[0].receiver.firstName} ${ordersContent[0].receiver.lastName}`
    );

    expect(ordersId).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });
});
