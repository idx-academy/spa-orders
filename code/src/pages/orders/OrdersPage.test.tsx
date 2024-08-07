import { screen } from "@testing-library/react";

import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import usePagination from "@/hooks/use-pagination/usePagination";
import OrdersPage from "@/pages/orders/OrdersPage";
import { useGetUserOrdersQuery } from "@/store/api/ordersApi";
import { RTKQueryMockState } from "@/types/common";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const user = { id: 3 };

const mockOrders = {
  totalElements: 0,
  totalPages: 0,
  sort: {
    sorted: true,
    unsorted: true,
    empty: true
  },
  first: true,
  last: true,
  number: 0,
  pageable: {
    page: 0,
    size: 1,
    sort: ["string"]
  },
  numberOfElements: 0,
  size: 0,
  empty: true,
  content: [
    {
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
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa61",
      isPaid: true,
      orderStatus: "COMPLETED",
      createdAt: "2024-06-30T14:25:15.396Z",
      receiver: {
        firstName: "Eugene",
        lastName: "Hetsyanyn",
        email: "eugene.hetsyanyn@gmail.com"
      },
      postAddress: {
        deliveryMethod: "NOVA",
        city: "Kyiv",
        department: "№7"
      },
      orderItems: []
    }
  ]
};

jest.mock("@/hooks/use-pagination/usePagination");
jest.mock("@/store/api/ordersApi");

jest.mock("@/containers/orders-list/OrdersList", () =>
  jest.fn(() => <div>OrdersList</div>)
);

jest.mock("@/hooks/use-get-user-details/useGetUserDetails", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockUseGetUserDetails = useGetUserDetails as jest.Mock;

const renderAndMock = (
  response: RTKQueryMockState<typeof mockOrders, Error> = {}
) => {
  (useGetUserOrdersQuery as jest.Mock).mockReturnValueOnce({
    isLoading: false,
    data: mockOrders,
    ...response
  });

  (usePagination as jest.Mock).mockReturnValueOnce({ page: 1 });

  mockUseGetUserDetails.mockReturnValue(user);

  renderWithProviders(<OrdersPage />);
};

describe("Test order page", () => {
  test("Should display OrdersList", () => {
    renderAndMock();

    expect(useGetUserOrdersQuery).toHaveBeenCalledWith({
      userId: user.id,
      lang: "en",
      page: 0,
      size: 8
    });

    const ordersListElement = screen.getByText(/OrdersList/);

    expect(ordersListElement).toBeInTheDocument();
  });

  test("Should display OrdersList and correct message if there are orders", () => {
    renderAndMock();

    const ordersListElement = screen.getByText(/OrdersList/);
    const messageElement = screen.getByText(/ordersPage.yourOrders/);

    expect(ordersListElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("Should display correct message if there are no orders", () => {
    renderAndMock({ data: null });

    const messageElement = screen.getByText(/ordersPage.noOrders/);

    expect(messageElement).toBeInTheDocument();
  });

  test("Should display loading indicator when data is being fetched", () => {
    renderAndMock({ isLoading: true });

    const loaderElement = screen.getByRole("progressbar");

    expect(loaderElement).toBeInTheDocument();
  });

  test("renders error element when error is not null", () => {
    renderAndMock({ error: new Error("message") });

    const errorElement = screen.getByText("errors.somethingWentWrong");

    expect(errorElement).toBeInTheDocument();
  });
});
