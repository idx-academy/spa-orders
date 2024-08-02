import { fireEvent, screen, waitFor } from "@testing-library/react";

import { mockOrders } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockStatusChange = jest.fn();
const mockIsPaidChange = jest.fn();

describe("OrdersTableBody", () => {
  beforeEach(() => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <OrdersTableBody
              onStatusChange={mockStatusChange}
              onIsPaidChange={mockIsPaidChange}
              order={mockOrders[0]}
            />
          </tr>
        </tbody>
      </table>
    );
  });

  test("renders order information correctly", () => {
    const ordersReceiver = screen.getByText(
      `${mockOrders[0].receiver.lastName} ${mockOrders[0].receiver.firstName}`
    );
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });

  test("Should render select elements properly", () => {
    const statusSelectText = screen.getByText("orders.statuses.inProgress");
    const statusSelect = screen.getByTestId("order-status");

    fireEvent.mouseDown(statusSelectText);

    const probableIcon = statusSelect.getElementsByTagName("svg")[0];

    const statusSelectMenu = screen.getByTestId("order-status-menu");
    const statusSelectInput = screen.getByTestId("order-status-input");

    expect(probableIcon).toBeUndefined();
    expect(statusSelectMenu).toBeInTheDocument();
    expect(statusSelectInput).toBeInTheDocument();
  });

  test("Should change order status", () => {
    const statusSelect = screen.getByText("orders.statuses.inProgress");

    fireEvent.mouseDown(statusSelect);

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(5);

    const desiredStatus = screen.getByText("orders.statuses.delivered");

    fireEvent.click(desiredStatus);

    expect(mockStatusChange).toHaveBeenCalledWith("DELIVERED");
  });

  test("Should trigger isPaid status change after click on checkbox", () => {
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeDisabled();

    fireEvent.click(checkbox);

    expect(mockIsPaidChange).toHaveBeenCalled();
  });

  test("Should show tooltip after hover", () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.notpaid.tooltip/);
      expect(tooltip).toBeInTheDocument();
    });
  });
});

describe("OrdersTableBody canceled order", () => {
  beforeEach(() => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <OrdersTableBody
              onStatusChange={mockStatusChange}
              onIsPaidChange={mockIsPaidChange}
              order={mockOrders[1]}
            />
          </tr>
        </tbody>
      </table>
    );
  });
  test("Should not trigger isPaid status change after click on checkbox", () => {
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  test("Should show tooltip after hover", () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.canceled.tooltip/);
      expect(tooltip).toBeInTheDocument();
    });
  });
});
