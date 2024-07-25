import { fireEvent, screen } from "@testing-library/react";
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
      new URLSearchParams(),
      mockSetSearchParams
    ]);
  });

  const renderComponent = (head: string) => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <OrdersTableHead head={head} />
          </tr>
        </tbody>
      </table>
    );
  };

  test("renders correctly with the provided head", () => {
    renderComponent("ordersTable.columns.createdAt");
    const headElement = screen.getByText(/ordersTable.columns.createdAt/i);
    expect(headElement).toBeInTheDocument();
  });

  test("renders AppTableSortLabel when sortKey is valid", () => {
    renderComponent("ordersTable.columns.totalPrice");
    const sortLabelElement = screen.getByRole("button");
    expect(sortLabelElement).toBeInTheDocument();
  });

  test("does not render AppTableSortLabel when sortKey is null", () => {
    renderComponent("invalid.column");
    const headElement = screen.getByText(/invalid.column/i);
    expect(headElement).toBeInTheDocument();
    const sortLabelElement = screen.queryByTestId("ArrowDownwardIcon");
    expect(sortLabelElement).not.toBeInTheDocument();
  });

  test("updates searchParams on sort", () => {
    renderComponent("ordersTable.columns.totalPrice");
    const sortButton = screen.getByTestId("ArrowDownwardIcon");

    expect(sortButton).toBeInTheDocument();
    fireEvent.click(sortButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const params = new URLSearchParams(mockSetSearchParams.mock.calls[0][0]);
    expect(params.get("sort")).toBe("total,asc");

    fireEvent.click(sortButton);
    const newparams = new URLSearchParams(mockSetSearchParams.mock.calls[1][0]);
    expect(newparams.get("sort")).toBe("total,desc");
  });

  test("renders all sortable fields with AppTableSortLabel", () => {
    sortableFields.forEach((field, index) => {
      renderComponent(field);
      const sortButton = screen.getAllByTestId("ArrowDownwardIcon")[index];
      expect(sortButton).toBeInTheDocument();

      fireEvent.click(sortButton);
      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  test("sort icon has correct initial and updated classes", () => {
    renderComponent("ordersTable.columns.totalPrice");
    const sortButton = screen.getByTestId("ArrowDownwardIcon");

    expect(sortButton).toHaveClass("MuiTableSortLabel-iconDirectionDesc");

    fireEvent.click(sortButton);
    expect(sortButton).toHaveClass("MuiTableSortLabel-iconDirectionAsc");

    fireEvent.click(sortButton);
    expect(sortButton).toHaveClass("MuiTableSortLabel-iconDirectionDesc");
  });
});
