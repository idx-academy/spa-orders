import { fireEvent, screen, waitFor } from "@testing-library/react";

import OrdersTable from "@/containers/tables/orders-table/OrdersTable";
import {
  mockOrders,
  tableColumns
} from "@/containers/tables/orders-table/OrdersTable.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockSetStatus = jest.fn();
const mockSetIsPaid = jest.fn();

jest.mock("@/store/api/ordersApi", () => ({
  useChangeOrderStatusMutation: jest.fn(() => [mockSetStatus, mockSetIsPaid])
}));

describe("OrdersTable", () => {
  test("renders correctly", () => {
    const { container } = renderWithProviders(
      <OrdersTable ordersData={mockOrders} />
    );

    tableColumns.forEach((column) => {
      const columnElement = screen.getByText(column);
      expect(columnElement).toBeInTheDocument();
    });

    const bodyElement = container.querySelector(".spa-order-table__body");
    const containerElement = container.querySelector(".spa-order-table");

    expect(bodyElement).toBeInTheDocument();
    expect(containerElement).toBeInTheDocument();
  });

  test("renders fallback", () => {
    renderWithProviders(<OrdersTable ordersData={[]} />);

    const fallbackText = screen.getByText(/ordersTable.fallback/);
    expect(fallbackText).toBeInTheDocument();

    const fallBackContainer = screen.getByTestId("table-fallback");
    expect(fallBackContainer).toHaveClass("spa-order-table__fallback");
  });

  test("Should call function to set status", () => {
    renderWithProviders(<OrdersTable ordersData={mockOrders} />);

    const statusSelect = screen.getByText("orders.statuses.inProgress");

    fireEvent.mouseDown(statusSelect);

    const desiredStatus = screen.getByText("orders.statuses.delivered");

    fireEvent.click(desiredStatus);

    expect(mockSetStatus).toHaveBeenCalledWith({
      orderId: mockOrders[0].id,
      orderStatus: "DELIVERED"
    });
  });

  test("Should call function to set status", () => {
    renderWithProviders(<OrdersTable ordersData={mockOrders} />);

    const checkboxBlank = screen.getAllByTestId("CheckBoxOutlineBlankIcon")[0];

    fireEvent.click(checkboxBlank);
    waitFor(() => {
      expect(mockSetIsPaid).toHaveBeenCalledWith({
        orderId: mockOrders[0].id,
        orderStatus: "IN_PROGRESS",
        isPaid: true
      });
    });
  });
});
