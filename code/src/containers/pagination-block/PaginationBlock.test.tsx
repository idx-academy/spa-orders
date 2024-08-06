import { screen } from "@testing-library/react";

import PaginationBlock from "@/containers/pagination-block/PaginationBlock";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("PaginationBlock", () => {
  test("does not render pagination block when totalPages is less than or equal to 1", () => {
    const { container } = renderWithProviders(<PaginationBlock />);
    expect(container).toBeEmptyDOMElement();

    const navigation = screen.queryByRole("navigation");
    expect(navigation).not.toBeInTheDocument();
  });

  test("renders pagination block when totalPages is more than 1", () => {
    renderWithProviders(<PaginationBlock totalPages={10} />);

    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  });
});
