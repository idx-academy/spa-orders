import { render, screen } from "@testing-library/react";

import {
  mockProducts,
  productStatuToTranslationKeyMap
} from "@/containers/tables/products-table/ProductsTable.constants";
import ProductsTableBody from "@/containers/tables/products-table/components/products-table-body/ProductsTableBody";

import formatPrice from "@/utils/format-price/formatPrice";

const categoryTag =
  mockProducts[0].tags.find((tag) => /category/.test(tag)) || "-";

describe("Test ProductsTable", () => {
  test("Should be rendered correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <ProductsTableBody product={mockProducts[0]} />
          </tr>
        </tbody>
      </table>
    );

    const imageElement = screen.getByRole("img");
    const nameElement = screen.getByText(mockProducts[0].name);
    const priceElement = screen.getByText(formatPrice(mockProducts[0].price));
    const statusElement = screen.getByText(
      productStatuToTranslationKeyMap[mockProducts[0].status]
    );
    const categoryElement = screen.getByText(categoryTag.replace(":", "."));

    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
  });
});
