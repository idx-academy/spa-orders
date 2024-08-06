import { fireEvent, screen, waitFor } from "@testing-library/react";

import { mockOrders } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";

import { ROLES } from "@/constants/common";
import { orderDeliveryStatuses } from "@/constants/orderStatuses";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { AdminOrder } from "@/types/order.types";
import { UserRole } from "@/types/user.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockStatusChange = jest.fn();
const mockIsPaidChange = jest.fn();

jest.mock("@/store/slices/userSlice", () => ({
  useUserDetailsSelector: jest.fn()
}));

type RenderComponent = {
  order: AdminOrder;
  role: UserRole | null;
};

const renderOrdersTableBody = ({ order, role }: RenderComponent) => {
  (useUserDetailsSelector as jest.Mock).mockReturnValue(
    role && { role, id: "1" }
  );

  return renderWithProviders(
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders order information correctly", () => {
    renderOrdersTableBody({ order: mockOrders[0], role: ROLES.SHOP_MANAGER });
    const ordersReceiver = screen.getByText(
      `${mockOrders[0].receiver.lastName} ${mockOrders[0].receiver.firstName}`
    );
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });

  test("not renders order information correctly if user role is 'null'", () => {
    renderOrdersTableBody({ order: mockOrders[0], role: null });
    const checkbox = screen.getByRole("checkbox");

    fireEvent.mouseOver(checkbox);
    waitFor(() => {
      const tooltip = screen.getByText(/ordersTable.notpaid.tooltip/);
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("for Manager role", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test("renders select elements properly", () => {
      renderOrdersTableBody({ order: mockOrders[0], role: ROLES.SHOP_MANAGER });
      const statusSelectText = screen.getByText(
        orderStatusesTranslationKeys.IN_PROGRESS
      );

      fireEvent.mouseDown(statusSelectText);

      const statusSelectMenu = screen.getByTestId("order-status-menu");
      const statusSelectInput = screen.getByTestId("order-status-input");

      expect(statusSelectMenu).toBeInTheDocument();
      expect(statusSelectInput).toBeInTheDocument();
    });

    test("changes order status", () => {
      renderOrdersTableBody({ order: mockOrders[0], role: ROLES.SHOP_MANAGER });
      const statusSelect = screen.getByText(
        orderStatusesTranslationKeys.IN_PROGRESS
      );

      fireEvent.mouseDown(statusSelect);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(5);

      const desiredStatus = screen.getByText(
        orderStatusesTranslationKeys.DELIVERED
      );

      fireEvent.click(desiredStatus);
      expect(mockStatusChange).toHaveBeenCalledWith(
        orderDeliveryStatuses.DELIVERED
      );
      expect(desiredStatus).not.toHaveAttribute("aria-disabled", "true");
    });

    test("not changes order status when choose the current order status", () => {
      renderOrdersTableBody({ order: mockOrders[2], role: ROLES.SHOP_MANAGER });
      const statusSelect = screen.getByText(
        orderStatusesTranslationKeys.SHIPPED
      );

      fireEvent.mouseDown(statusSelect);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);

      const desiredStatus = screen.getByRole("option", {
        name: orderStatusesTranslationKeys.SHIPPED
      });
      expect(desiredStatus).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(desiredStatus);
      waitFor(() => {
        expect(mockStatusChange).not.toHaveBeenCalledWith(
          orderDeliveryStatuses.SHIPPED
        );
      });
    });

    test("not changes order status when choose the current order status", () => {
      renderOrdersTableBody({ order: mockOrders[1], role: ROLES.SHOP_MANAGER });
      const statusSelect = screen.getByText(
        orderStatusesTranslationKeys.CANCELED
      );

      fireEvent.mouseDown(statusSelect);

      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(1);

      const desiredStatus = screen.getByRole("option", {
        name: orderStatusesTranslationKeys.CANCELED
      });

      expect(desiredStatus).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(desiredStatus);
      waitFor(() => {
        expect(mockStatusChange).not.toHaveBeenCalledWith(
          orderDeliveryStatuses.CANCELED
        );
      });
    });

    test("triggers isPaid status change after click on checkbox", () => {
      renderOrdersTableBody({ order: mockOrders[0], role: ROLES.SHOP_MANAGER });
      const checkboxBlank = screen.getByTestId("CheckBoxOutlineBlankIcon");
      expect(checkboxBlank).toBeInTheDocument();

      const checkboxWrapper = screen
        .getByTestId("CheckBoxOutlineBlankIcon")
        .closest("span");

      expect(checkboxWrapper).not.toHaveAttribute("aria-disabled", "true");

      fireEvent.click(checkboxBlank);

      expect(mockIsPaidChange).toHaveBeenCalledWith(true);
      expect(checkboxBlank).not.toBeInTheDocument();

      const checkboxChecked = screen.getByTestId("CheckBoxIcon");
      expect(checkboxChecked).toBeInTheDocument();
    });

    test("shows tooltip after hover on not checked checkbox", () => {
      renderOrdersTableBody({ order: mockOrders[0], role: ROLES.SHOP_MANAGER });
      const checkbox = screen.getByRole("checkbox");

      fireEvent.mouseOver(checkbox);
      waitFor(() => {
        const tooltip = screen.getByText(/ordersTable.notpaid.tooltip/);
        expect(tooltip).toBeInTheDocument();
      });
    });

    test("not trigger isPaid status change after click on checkbox, when order is canceled", () => {
      renderOrdersTableBody({ order: mockOrders[1], role: ROLES.SHOP_MANAGER });
      const checkbox = screen.getByTestId("CheckBoxOutlineBlankIcon");

      const checkboxWrapper = screen
        .getByTestId("CheckBoxOutlineBlankIcon")
        .closest("span");

      expect(checkboxWrapper).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(checkbox);

      expect(mockIsPaidChange).not.toHaveBeenCalledWith(true);
    });

    test("shows tooltip after hover on canseled order checkbox", () => {
      renderOrdersTableBody({ order: mockOrders[1], role: ROLES.SHOP_MANAGER });
      const checkbox = screen.getByRole("checkbox");

      fireEvent.mouseOver(checkbox);
      waitFor(() => {
        const tooltip = screen.getByText(/ordersTable.canceled.tooltip/);
        expect(tooltip).toBeInTheDocument();
      });
    });

    test("not trigger isPaid status change after click on checkbox, when order is already paid", () => {
      renderOrdersTableBody({ order: mockOrders[2], role: ROLES.SHOP_MANAGER });
      const checkbox = screen.getByTestId("CheckBoxIcon");

      fireEvent.click(checkbox);
      expect(mockIsPaidChange).not.toHaveBeenCalledWith(false);
    });

    test("shows tooltip after hover on paid order checkbox", () => {
      renderOrdersTableBody({ order: mockOrders[2], role: ROLES.SHOP_MANAGER });
      const checkbox = screen.getByRole("checkbox");

      fireEvent.mouseOver(checkbox);
      waitFor(() => {
        const tooltip = screen.getByText(/ordersTable.ispaid.tooltip/);
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe("for Admin role", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test("changes order status in progress direction", () => {
      renderOrdersTableBody({ order: mockOrders[0], role: ROLES.ADMIN });
      const statusSelect = screen.getByText(
        orderStatusesTranslationKeys.IN_PROGRESS
      );

      fireEvent.mouseDown(statusSelect);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(5);

      const desiredStatus = screen.getByRole("option", {
        name: orderStatusesTranslationKeys.DELIVERED
      });

      fireEvent.click(desiredStatus);

      expect(mockStatusChange).toHaveBeenCalledWith(
        orderDeliveryStatuses.DELIVERED
      );
    });

    test("changes order status in regress direction", () => {
      renderOrdersTableBody({ order: mockOrders[2], role: ROLES.ADMIN });
      const statusSelect = screen.getByText(
        orderStatusesTranslationKeys.SHIPPED
      );

      fireEvent.mouseDown(statusSelect);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(5);

      const desiredStatus = screen.getByRole("option", {
        name: orderStatusesTranslationKeys.IN_PROGRESS
      });

      fireEvent.click(desiredStatus);

      expect(mockStatusChange).toHaveBeenCalledWith(
        orderDeliveryStatuses.IN_PROGRESS
      );
      expect(desiredStatus).not.toHaveAttribute("aria-disabled", "true");
    });
  });

  test("not change order status", () => {
    renderOrdersTableBody({ order: mockOrders[2], role: ROLES.ADMIN });
    const statusSelect = screen.getByText(orderStatusesTranslationKeys.SHIPPED);

    fireEvent.mouseDown(statusSelect);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);

    const desiredStatus = screen.getByRole("option", {
      name: orderStatusesTranslationKeys.SHIPPED
    });

    expect(desiredStatus).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(desiredStatus);
    waitFor(() => {
      expect(mockStatusChange).not.toHaveBeenCalledWith(
        orderDeliveryStatuses.SHIPPED
      );
    });
  });

  test("triggers isPaid status change on true after click on checkbox", () => {
    renderOrdersTableBody({ order: mockOrders[0], role: ROLES.ADMIN });
    const checkboxBlank = screen.getByTestId("CheckBoxOutlineBlankIcon");

    expect(checkboxBlank).toBeInTheDocument();
    expect(checkboxBlank).not.toBeDisabled();

    fireEvent.click(checkboxBlank);
    waitFor(() => {
      expect(mockIsPaidChange).toHaveBeenCalledWith(true);
      expect(checkboxBlank).not.toBeInTheDocument();
      const checkboxChecked = screen.getByTestId("CheckBoxIcon");
      expect(checkboxChecked).toBeInTheDocument();
    });
  });

  test("triggers isPaid status change on false after click on checkbox", () => {
    renderOrdersTableBody({ order: mockOrders[2], role: ROLES.ADMIN });

    const checkboxChecked = screen.getByTestId("CheckBoxIcon");
    expect(checkboxChecked).toBeInTheDocument();

    fireEvent.click(checkboxChecked);

    expect(mockIsPaidChange).toHaveBeenCalledWith(false);
  });

  test("triggers isPaid status change on true after click on canceled checkbox", () => {
    renderOrdersTableBody({ order: mockOrders[1], role: ROLES.ADMIN });

    const checkboxBlank = screen.getByTestId("CheckBoxOutlineBlankIcon");

    fireEvent.click(checkboxBlank);

    expect(mockIsPaidChange).toHaveBeenCalledWith(true);
  });
});
