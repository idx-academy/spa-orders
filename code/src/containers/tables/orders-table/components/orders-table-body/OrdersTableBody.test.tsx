import { fireEvent, screen, waitFor } from "@testing-library/react";

import { mockOrders } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";

import { AdminOrder } from "@/types/order.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockStatusChange = jest.fn();
const mockIsPaidChange = jest.fn();

const renderOrdersTableBody = (order: AdminOrder) => {
  renderWithProviders(
    <table>
      <tbody>
        <tr>
          <OrdersTableBody
            onStatusChange={mockStatusChange}
            onIsPaidChange={mockIsPaidChange}
            order={order}
          />
        </tr>
      </tbody>
    </table>
  );
};

describe("OrdersTableBody", () => {
  test("renders order information correctly", () => {
    renderOrdersTableBody(mockOrders[0]);
    const ordersReceiver = screen.getByText(
      `${mockOrders[0].receiver.lastName} ${mockOrders[0].receiver.firstName}`
    );
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });

  test("Should render select elements properly", () => {
    renderOrdersTableBody(mockOrders[0]);
    const statusSelectText = screen.getByText("orders.statuses.inProgress");

    fireEvent.mouseDown(statusSelectText);

    const statusSelectMenu = screen.getByTestId("order-status-menu");
    const statusSelectInput = screen.getByTestId("order-status-input");

    expect(statusSelectMenu).toBeInTheDocument();
    expect(statusSelectInput).toBeInTheDocument();
  });

  test("Should change order status", () => {
    renderOrdersTableBody(mockOrders[0]);
    const statusSelect = screen.getByText("orders.statuses.inProgress");

    fireEvent.mouseDown(statusSelect);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);

    const desiredStatus = screen.getByText("orders.statuses.delivered");

    fireEvent.click(desiredStatus);
    expect(mockStatusChange).toHaveBeenCalledWith("DELIVERED");
  });

  test("Should trigger isPaid status change after click on checkbox", async () => {
    renderOrdersTableBody(mockOrders[0]);
    const checkboxBlank = screen.getByTestId("CheckBoxOutlineBlankIcon");
    expect(checkboxBlank).toBeInTheDocument();
    expect(checkboxBlank).not.toBeDisabled();

    fireEvent.click(checkboxBlank);
    await waitFor(() => {
      expect(mockIsPaidChange).toHaveBeenCalledWith(true);
      expect(checkboxBlank).not.toBeInTheDocument();
    });

    const checkboxChecked = screen.getByTestId("CheckBoxIcon");
    expect(checkboxChecked).toBeInTheDocument();
  });

  test("Should show tooltip after hover on not checked checkbox", () => {
    renderOrdersTableBody(mockOrders[0]);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.notpaid.tooltip/);
      expect(tooltip).toBeInTheDocument();
    });
  });

  test("Should not trigger isPaid status change after click on checkbox, when order is canceled", () => {
    renderOrdersTableBody(mockOrders[1]);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  test("Should show tooltip after hover on canseled order checkbox", () => {
    renderOrdersTableBody(mockOrders[1]);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.canceled.tooltip/);
      expect(tooltip).toBeInTheDocument();
    });
  });

  test("Should not trigger isPaid status change after click on checkbox, when order is already paid", () => {
    renderOrdersTableBody(mockOrders[2]);
    const checkbox = screen.getByRole("checkbox");

    waitFor(() => {
      fireEvent.click(checkbox);
      expect(mockIsPaidChange).not.toHaveBeenCalledWith(false);
    });

    expect(checkbox).toBeDisabled();
  });

  test("Should show tooltip after hover on paid order checkbox", () => {
    renderOrdersTableBody(mockOrders[2]);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.ispaid.tooltip/);
      expect(tooltip).toBeInTheDocument();
    });
  });
});
