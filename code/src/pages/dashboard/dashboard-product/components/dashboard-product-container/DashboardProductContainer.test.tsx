import { fireEvent, screen } from "@testing-library/react";

import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import DashboardProductContainer from "@/pages/dashboard/dashboard-product/components/dashboard-product-container/DashboardProductContainer";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import { RTKQueryReturnState } from "@/types/common";
import { GetManagerProductByIdResponse } from "@/types/product.types";
import formatPrice from "@/utils/format-price/formatPrice";
import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const validUUID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const mockRedirect = ({
  errorMessageTranslationKey
}: Pick<RedirectConfig, "errorMessageTranslationKey">) => (
  <div>{errorMessageTranslationKey}</div>
);

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect", () => ({
  __esModule: true,
  default: jest.fn(() => ({ renderRedirectComponent: mockRedirect }))
}));

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductQuery: jest.fn()
}));

const managerProduct: GetManagerProductByIdResponse = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  status: "VISIBLE",
  image:
    "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_1-QodrkqNjm6MWrKqg9ixBBMMfFU40X7.jpg",
  createdAt: "2024-07-29T20:20:02.404Z",
  quantity: 10,
  price: 999.99,
  tags: [
    {
      id: 1,
      name: "category:mobile"
    }
  ],
  productTranslations: [
    {
      name: "APPLE iPhone",
      description: "Screen 6.1 Super Retina XDR, 2532x1170 / A16 Bionic chip",
      languageCode: "en"
    },
    {
      name: "APPLE Айфон",
      description: "Дисплей 6.1 Super Retina XDR, 2532x1170 / A16 Bionic chip",
      languageCode: "uk"
    }
  ]
};

const defaultParams = {
  data: managerProduct,
  isLoading: false,
  error: null
};

const mockAndRender = (
  response: Partial<
    RTKQueryReturnState<GetManagerProductByIdResponse, unknown>
  > = defaultParams
) => {
  (useGetManagerProductQuery as jest.Mock).mockReturnValue(response);
  renderWithProviders(<DashboardProductContainer productId={validUUID} />);
};

describe("Test DashboardProductPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly", () => {
    mockAndRender();

    const title = screen.getByText("dashboardProduct.title");
    const img = screen.getByTestId("product-image");
    const quantity = screen.getByText(managerProduct.quantity);
    const price = screen.getByText(formatPrice(managerProduct.price));
    const category = screen.getByText(
      `productsAll.${getCategoryFromTags(managerProduct.tags.map((item) => item.name))}`
    );
    const name = screen.getByText(managerProduct.productTranslations[0].name);

    const langBtns = screen.getAllByTestId("product-language-button");

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(name).toBeInTheDocument();

    managerProduct.productTranslations[0].description
      .split("/")
      .forEach((item) => {
        const descriptionPart = screen.getByText(item.trim());
        expect(descriptionPart).toBeInTheDocument();
      });

    expect(langBtns).toHaveLength(2);
    expect(langBtns[0]).toHaveClass(
      "dashboard-product__language-button--active"
    );
    expect(langBtns[1]).not.toHaveClass(
      "dashboard-product__language-button--active"
    );
  });

  test("Should change languages", async () => {
    mockAndRender();

    const langBtns = screen.getAllByTestId("product-language-button");

    fireEvent.click(langBtns[1]);

    const name = screen.getByText(managerProduct.productTranslations[1].name);
    expect(name).toBeInTheDocument();
  });

  test("Should call useGetManagerProductQuery with productId", () => {
    mockAndRender();

    expect(useGetManagerProductQuery).toHaveBeenCalledWith({
      productId: validUUID
    });
  });

  test("Should show error message if there is some request error that is not 404", () => {
    mockAndRender({
      error: { status: 500 }
    });

    const label = screen.getByText("errors.somethingWentWrong");
    expect(label).toBeInTheDocument();
  });

  test("Should display loding fallback while loading", () => {
    mockAndRender({
      isLoading: true
    });

    const label = screen.getByTestId("page-loading-fallback");
    expect(label).toBeInTheDocument();
  });
});
