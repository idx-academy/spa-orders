import { fireEvent, render, screen } from "@testing-library/react";

import AppTableSortLabel from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel";
import { AppTableSortLabelProps } from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel.types";

const mockProps: AppTableSortLabelProps = {
  sortDirection: "asc",
  onSortClick: jest.fn(),
  children: "Sort Column"
};

describe("AppTableSortLabel", () => {
  beforeEach(() => {
    render(<AppTableSortLabel {...mockProps} />);
  });

  test("renders with correct text", () => {
    expect(screen.getByText("Sort Column")).toBeInTheDocument();
  });

  test("calls onSortClick when clicked", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onSortClick).toHaveBeenCalledTimes(1);
  });
});
