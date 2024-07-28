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
    mockSetSearchParams.mockClear();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(`sort=${"createdAt,desc"}`),
      mockSetSearchParams
    ]);
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

  test("renders correctly with the provided head", () => {
    renderComponent(["ordersTable.columns.createdAt"]);
    const headElement = screen.getByText(/ordersTable.columns.createdAt/i);
    expect(headElement).toBeInTheDocument();
    const sortLabelElement = screen.getByRole("button");
    expect(sortLabelElement).toBeInTheDocument();
  });

  // test("renders AppTableSortLabel when sortKey is valid", () => {
  //   renderComponent(["ordersTable.columns.totalPrice"]);
  //   const sortLabelElement = screen.getByRole("button");
  //   expect(sortLabelElement).toBeInTheDocument();
  // });

  test("does not render AppTableSortLabel when sortKey is null", () => {
    renderComponent([]);
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

  test("updates searchParams on sort", () => {
    renderComponent(sortableFields);
    const sortButtonCreatedAt = screen.getAllByTestId("ArrowDownwardIcon")[0];
    const sortButtonTotalPrice = screen.getAllByTestId("ArrowDownwardIcon")[1];

    fireEvent.click(sortButtonCreatedAt);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    let params = new URLSearchParams(mockSetSearchParams.mock.calls[0][0]);
    expect(params.get("sort")).toBe("createdAt,asc");

    fireEvent.click(sortButtonCreatedAt);
    waitFor(() => {
      params = new URLSearchParams(mockSetSearchParams.mock.calls[1][0]);
      expect(params.get("sort")).toBe("createdAt,desc");
    });

    fireEvent.click(sortButtonTotalPrice);
    waitFor(() => {
      params = new URLSearchParams(mockSetSearchParams.mock.calls[2][0]);
      expect(params.get("sort")).toBe("total,asc");
    });

    fireEvent.click(sortButtonCreatedAt);
    waitFor(() => {
      params = new URLSearchParams(mockSetSearchParams.mock.calls[3][0]);
      expect(params.get("sort")).toBe("createdAt,asc");
    });
  });

  test("initial isActive is set correctly based on URL-sort parameter and icon class updates", () => {
    renderComponent([
      "ordersTable.columns.createdAt",
      "ordersTable.columns.totalPrice"
    ]);
    const sortButtonCreatedAt = screen.getAllByRole("button")[0];
    expect(sortButtonCreatedAt).toHaveClass("Mui-active");
    const sortButtonCreatedAtIcon =
      screen.getAllByTestId("ArrowDownwardIcon")[0];

    const sortButtonTotal = screen.getAllByRole("button")[1];
    expect(sortButtonTotal).not.toHaveClass("Mui-active");
    const sortButtonTotalIcon = screen.getAllByTestId("ArrowDownwardIcon")[1];
    expect(sortButtonTotalIcon).toHaveClass(
      "MuiTableSortLabel-iconDirectionDesc"
    );

    fireEvent.click(sortButtonTotal);

    waitFor(() => {
      expect(sortButtonTotal).toHaveClass("Mui-active");
      expect(sortButtonTotalIcon).not.toHaveClass(
        "MuiTableSortLabel-iconDirectionDesc"
      );
      expect(sortButtonCreatedAt).not.toHaveClass("Mui-active");
      expect(sortButtonCreatedAtIcon).toHaveClass(
        "MuiTableSortLabel-iconDirectionDesc"
      );
    });

    fireEvent.click(sortButtonCreatedAt);
    waitFor(() => {
      expect(sortButtonCreatedAt).toHaveClass("Mui-active");
      expect(sortButtonCreatedAtIcon).toHaveClass(
        "MuiTableSortLabel-iconDirectionAsc"
      );
      expect(sortButtonTotal).not.toHaveClass("Mui-active");
      expect(sortButtonTotalIcon).toHaveClass(
        "MuiTableSortLabel-iconDirectionDesc"
      );
    });
  });
});
