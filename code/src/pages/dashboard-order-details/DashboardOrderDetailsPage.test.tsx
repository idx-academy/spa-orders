import { screen } from "@testing-library/react";
import { useParams } from "react-router-dom";

import OrderItem from "@/containers/order-item/OrderItem";

import DashboardOrderDetailsPage from "@/pages/dashboard-order-details/DashboardOrderDetailsPage";
import { useGetAdminOrderByIdQuery } from "@/store/api/ordersApi";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockOrder = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  isPaid: true,
  orderStatus: "IN_PROGRESS",
  createdAt: "2024-06-27T12:35:14.396Z",
  receiver: {
    firstName: "Eugene",
    lastName: "Hetsyanyn",
    email: "eugene.hetsyanyn@gmail.com"
  },
  postAddress: {
    deliveryMethod: "NOVA",
    city: "Kyiv",
    department: "№5"
  },
  orderItems: []
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    renderRedirectComponent: jest.fn(({ errorMessageTranslationKey }) => (
      <div>{errorMessageTranslationKey}</div>
    ))
  }))
}));

jest.mock("@/store/api/ordersApi", () => ({
  useGetAdminOrderByIdQuery: jest.fn()
}));

jest.mock("@/containers/order-item/OrderItem", () => ({
  __esModule: true,
  default: jest.fn(() => <div>OrderItem</div>)
}));

let mockOrderId: string | undefined;

const renderAndMock = (response = {}) => {
  (useParams as jest.Mock).mockReturnValue({ orderId: mockOrderId });
  (useGetAdminOrderByIdQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    data: mockOrder,
    ...response
  });

  renderWithProviders(<DashboardOrderDetailsPage />);
};

describe("DashboardOrderDetailsPage", () => {
  beforeEach(() => {
    mockOrderId = mockOrder.id;
  });

  describe("When orderIdg are provided", () => {
    test("Displays OrderItem component", () => {
      renderAndMock();

      const orderItemElement = screen.getByText(/OrderItem/);

      expect(orderItemElement).toBeInTheDocument();
    });

    test("Passes the correct parameters to the API query", () => {
      renderAndMock({});

      expect(useGetAdminOrderByIdQuery).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        lang: "en"
      });
    });

    test("Passes isExpanded=true to OrderItem component", () => {
      renderAndMock();

      expect(OrderItem).toHaveBeenCalledWith(
        expect.objectContaining({ isExpanded: true, order: mockOrder }),
        {}
      );
    });
  });

  describe("When no order is found", () => {
    test("Displays 'no order found' message", () => {
      renderAndMock({ data: null });

      const messageElement = screen.getByText(
        /dashboardOrderDetailsPage.orderNotFound/
      );

      expect(messageElement).toBeInTheDocument();
    });
  });

  describe("When data is being fetched", () => {
    test("Displays loading indicator", () => {
      renderAndMock({ isLoading: true });

      const loaderElement = screen.getByRole("progressbar");

      expect(loaderElement).toBeInTheDocument();
    });
  });

  describe("When orderId is not provided", () => {
    test("Redirects to not found page", () => {
      mockOrderId = undefined;

      renderAndMock();

      const errorMessageElement = screen.getByText(
        /dashboardOrderDetailsPage.orderNotFound/
      );

      expect(errorMessageElement).toBeInTheDocument();
    });
  });
});
