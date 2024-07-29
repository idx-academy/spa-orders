import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import OrdersTableHead from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

const mockSetSearchParams = jest.fn();

const sortableFields = [
  "ordersTable.columns.createdAt",
  "ordersTable.columns.totalPrice",
  "ordersTable.columns.status",
  "ordersTable.columns.isPaid"
];

describe("OrderTableHead", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams({ sort: "createdAt,asc" }),
      mockSetSearchParams
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (heads: string[]) => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            {heads.map((head) => (
              <OrdersTableHead key={head} head={head} />
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const checkSortParams = async (index: number, expected: string) => {
    await waitFor(() => {
      const params = new URLSearchParams(
        mockSetSearchParams.mock.calls[index][0]
      );
      expect(params.get("sort")).toBe(expected);
    });
  };

  const checkSetSearchParamsCall = async (expectedSort: string) => {
    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        new URLSearchParams({ sort: expectedSort })
      );
    });
  };

  test("renders correctly with the provided head", () => {
    renderComponent(["ordersTable.columns.createdAt"]);
    const headElement = screen.getByText(/ordersTable.columns.createdAt/i);
    expect(headElement).toBeInTheDocument();
    const sortLabelElement = screen.getByRole("button");
    expect(sortLabelElement).toBeInTheDocument();
  });

  test("does not render AppTableSortLabel when sortKey is null", () => {
    renderComponent(["nonSortableColumn"]);
    const sortLabelElement = screen.queryByTestId("ArrowDownwardIcon");
    expect(sortLabelElement).not.toBeInTheDocument();
  });

  test("renders all sortable fields with AppTableSortLabel", () => {
    sortableFields.forEach((field, index) => {
      renderComponent([field]);
      const sortButton = screen.getAllByTestId("ArrowDownwardIcon")[index];
      expect(sortButton).toBeInTheDocument();

      fireEvent.click(sortButton);
      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  test("updates searchParams on sort", async () => {
    renderComponent(sortableFields);
    const sortButtonCreatedAt = screen.getAllByTestId("ArrowDownwardIcon")[0];
    const sortButtonTotalPrice = screen.getAllByTestId("ArrowDownwardIcon")[1];

    fireEvent.click(sortButtonCreatedAt);

    const params = new URLSearchParams(mockSetSearchParams.mock.calls[0][0]);
    expect(params.get("sort")).toBe("createdAt,asc");

    fireEvent.click(sortButtonCreatedAt);
    await checkSortParams(1, "createdAt,desc");

    fireEvent.click(sortButtonTotalPrice);
    await checkSortParams(2, "total,asc");

    fireEvent.click(sortButtonCreatedAt);
    await checkSortParams(3, "createdAt,asc");
  });

  test("initial isActive is set correctly based on URL-sort parameter and icon class updates", () => {
    renderComponent([
      "ordersTable.columns.createdAt",
      "ordersTable.columns.totalPrice"
    ]);
    const sortButtonCreatedAt = screen.getAllByRole("button")[0];
    expect(sortButtonCreatedAt).toHaveClass("Mui-active");

    const sortButtonTotal = screen.getAllByRole("button")[1];
    expect(sortButtonTotal).not.toHaveClass("Mui-active");

    fireEvent.click(sortButtonTotal);

    waitFor(() => {
      expect(sortButtonCreatedAt).toHaveClass("Mui-active");
      expect(sortButtonTotal).not.toHaveClass("Mui-active");
    });
    waitFor(() => {
      fireEvent.click(sortButtonCreatedAt);
    });
    expect(sortButtonCreatedAt).toHaveClass("Mui-active");
    expect(sortButtonTotal).not.toHaveClass("Mui-active");
  });

  test("sets default sort direction on first render", async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams
    ]);
    renderComponent(sortableFields);
    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        new URLSearchParams({ sort: "createdAt,desc" })
      );
    });
  });

  test("correctly updates state on sort direction change", async () => {
    renderComponent([
      "ordersTable.columns.createdAt",
      "ordersTable.columns.totalPrice"
    ]);
    const sortButtonCreatedAt = screen.getByText(
      /ordersTable.columns.createdAt/i
    );
    const sortButtonTotal = screen.getByText(/ordersTable.columns.totalPrice/i);

    fireEvent.click(sortButtonCreatedAt);
    await checkSetSearchParamsCall("createdAt,asc");

    fireEvent.click(sortButtonCreatedAt);
    await checkSetSearchParamsCall("createdAt,desc");

    fireEvent.click(sortButtonCreatedAt);
    await checkSetSearchParamsCall("createdAt,asc");

    fireEvent.click(sortButtonTotal);
    await checkSetSearchParamsCall("total,asc");

    fireEvent.click(sortButtonCreatedAt);
    await checkSetSearchParamsCall("createdAt,asc");
  });
});
