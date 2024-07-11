import { render, screen } from "@testing-library/react";

import OrdersTab from "@/containers/dashboard-tabs/components/orders-tab/OrdersTab";

import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { RTKQueryMockState } from "@/types/common";

const mockAdminOrders = {
  content: [
    {
      id: "1",
      isPaid: true,
      orderStatus: "IN_PROGRESS",
      createdAt: "2024-06-27T12:35:14.396Z",
      receiver: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com"
      },
      postAddress: {
        deliveryMethod: "UPS",
        city: "New York",
        department: "123"
      },
      orderItems: []
    }
  ]
};

jest.mock("@/store/api/ordersApi", () => ({
  useGetAdminOrdersQuery: jest.fn()
}));

const renderAndMock = (
  response: RTKQueryMockState<typeof mockAdminOrders> = {}
) => {
  const defaultResponse = {
    data: { content: [] },
    ...response
  };

  (useGetAdminOrdersQuery as jest.Mock).mockReturnValueOnce(defaultResponse);
  render(<OrdersTab />);
};

describe("OrdersTab Component", () => {
  test("should display loading state correctly", () => {
    renderAndMock({ isLoading: true });

    const loadingText = screen.getByText(/Loading.../);
    expect(loadingText).toBeInTheDocument();
  });

  test("should display orders when data is available", () => {
    renderAndMock({ isLoading: false, data: mockAdminOrders });

    const ordersTitle = screen.getByText(/dashboardTabs.orders.title/);
    const orderId = screen.getByText(mockAdminOrders.content[0].id);

    expect(ordersTitle).toBeInTheDocument();
    expect(orderId).toBeInTheDocument();
  });

  test("should handle undefined ordersResponse", () => {
    renderAndMock({ isLoading: false, data: null });

    const noOrdersText = screen.getByText(/ordersTable.fallback/);
    expect(noOrdersText).toBeInTheDocument();
  });
});
