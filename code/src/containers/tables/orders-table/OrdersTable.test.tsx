import { render, screen } from "@testing-library/react";

import OrdersTable from "@/containers/tables/orders-table/OrdersTable";
import {
  ordersContent,
  tableColumns
} from "@/containers/tables/orders-table/OrdersTable.constants";

describe("OrdersTable", () => {
  test("renders correctly", () => {
    render(<OrdersTable orders={ordersContent} />);

    tableColumns.forEach((column) => {
      const columnElement = screen.getByText(column);
      expect(columnElement).toBeInTheDocument();
    });

    const ordersId = screen.getByText(ordersContent[0].id);
    expect(ordersId).toBeInTheDocument();
  });
});
