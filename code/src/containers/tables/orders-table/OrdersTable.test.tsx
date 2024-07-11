import { render, screen } from "@testing-library/react";

import OrdersTable from "@/containers/tables/orders-table/OrdersTable";
import {
  mockOrders,
  tableColumns
} from "@/containers/tables/orders-table/OrdersTable.constants";

describe("OrdersTable", () => {
  test("renders correctly", () => {
    render(<OrdersTable orders={mockOrders} />);

    tableColumns.forEach((column) => {
      const columnElement = screen.getByText(column);
      expect(columnElement).toBeInTheDocument();
    });

    const ordersId = screen.getByText(mockOrders[0].id);
    expect(ordersId).toBeInTheDocument();
  });

  test("renders fallback", () => {
    render(<OrdersTable orders={[]} />);

    const fallbackText = screen.getByText(/ordersTable.fallback/);
    expect(fallbackText).toBeInTheDocument();
  });
});
