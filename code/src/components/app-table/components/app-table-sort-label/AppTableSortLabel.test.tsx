import { fireEvent, render, screen } from "@testing-library/react";

import AppTableSortLabel from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel";
import { AppTableSortLabelProps } from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel.types";

const mockProps: AppTableSortLabelProps = {
  sortDirection: "asc",
  onClick: jest.fn(),
  children: "Sort Column"
};

describe("AppTableSortLabel", () => {
  beforeEach(() => {
    render(<AppTableSortLabel {...mockProps} />);
  });

  test("renders with correct text", () => {
    const sortColumn = screen.getByText("Sort Column")
    expect(sortColumn).toBeInTheDocument();
  });

  test("calls onSortClick when clicked", () => {
    const sortButton = screen.getByRole("button")
    fireEvent.click(sortButton);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
