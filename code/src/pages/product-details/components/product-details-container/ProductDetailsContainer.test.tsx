import { screen } from "@testing-library/react";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { productNotFoundRedirectConfig } from "@/pages/product-details/ProductsDetailsPage.constants";
import ProductDetailsContainer from "@/pages/product-details/components/product-details-container/ProductDetailsContainer";
import { useGetUserProductByIdQuery } from "@/store/api/productsApi";
import { RTKQueryMockState } from "@/types/common";
import formatPrice from "@/utils/format-price/formatPrice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockProduct = {
  image:
    "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_1-QodrkqNjm6MWrKqg9ixBBMMfFU40X7.jpg",
  quantity: 10,
  price: 999,
  tags: ["category:mobile"],
  name: "Mobile Phone Apple iPhone 14 Pro 128GB Space Gray",
  description:
    'Screen: 6.1" Super Retina XDR, 2532x1170 / A16 Bionic chip / Main Triple Camera: 48 MP + 12 MP + 12 MP, Front Camera: 12 MP / RAM 6 GB / 128 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM and eSIM) / iOS 16 / 3200 mAh'
};

const locale = "en";

const mockRenderRedirectComponent = jest.fn();

jest.mock("@/store/api/productsApi", () => ({
  useGetUserProductByIdQuery: jest.fn()
}));

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    renderRedirectComponent: mockRenderRedirectComponent
  }))
}));

jest.mock("@/context/i18n/I18nProvider", () => ({
  ...jest.requireActual("@/context/i18n/I18nProvider"),
  useLocaleContext: jest.fn(() => ({ locale }))
}));

type MockState = RTKQueryMockState<
  typeof mockProduct,
  Record<string, number | string> | null
>;

const defaultArgs: MockState = {
  data: null,
  isLoading: false,
  error: null
};

const productId = "1";

const renderAndMock = (args?: MockState) => {
  (useGetUserProductByIdQuery as jest.Mock).mockReturnValue({
    ...defaultArgs,
    ...args
  });
  renderWithProviders(<ProductDetailsContainer productId={productId} />);
};

describe("ProductDetailsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls useGetUserProductByIdQuery with correct arguments", () => {
    renderAndMock();

    expect(useGetUserProductByIdQuery).toHaveBeenCalledWith({
      productId,
      lang: locale
    });
  });

  test("renders loading element by default", () => {
    renderAndMock({ isLoading: true });

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("redirects to 404 page when error with status 404 is returned from server", () => {
    renderAndMock({ error: { status: 404 } });

    expect(mockRenderRedirectComponent).toHaveBeenCalledWith(
      productNotFoundRedirectConfig
    );
  });

  test("does not render 404 page when isErrorWithStatus returns false", () => {
    renderAndMock({ error: { message: "Test" } });

    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();
  });

  test("renders error element when there is an error but with status different from 404", () => {
    renderAndMock({ error: { status: 500 } });

    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();

    const errorElement = screen.getByText("Error...");
    expect(errorElement).toBeInTheDocument();
  });

  test("renders error element when there is not error and no product", () => {
    renderAndMock();

    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();

    const errorElement = screen.getByText("Error...");
    expect(errorElement).toBeInTheDocument();
  });

  test("renders product information correctly", () => {
    renderAndMock({ data: mockProduct });

    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();

    const productTitle = screen.getByText(mockProduct.name);
    expect(productTitle).toBeInTheDocument();

    const productPrice = screen.getByText(formatPrice(mockProduct.price));
    expect(productPrice).toBeInTheDocument();

    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toHaveAttribute("src", mockProduct.image);

    const categoryTag = screen.getByText("productsAll.mobile");
    expect(categoryTag).toBeInTheDocument();

    const inStockTypography = screen.getByText("productDetailsPage.inStock");
    expect(inStockTypography).toBeInTheDocument();
  });

  test("renders delivery methods correctly", () => {
    renderAndMock({ data: mockProduct });

    const deliveryMethodImages = screen.getAllByAltText(
      /dashboardTabs.orders.filters.\w+/
    );
    expect(deliveryMethodImages).toHaveLength(deliveryMethods.length);
  });

  test("renders description correctly", () => {
    renderAndMock({
      data: { ...mockProduct, description: "value1/value2/value3/value4" }
    });

    const descriptionParagraphs = screen.getAllByText(/value\d/);
    expect(descriptionParagraphs).toHaveLength(4);
  });

  test("does not render stock typography when quantity is 0", () => {
    renderAndMock({ data: { ...mockProduct, quantity: 0 } });

    const inStockTypography = screen.queryByText("productDetailsPage.inStock");
    expect(inStockTypography).not.toBeInTheDocument();
  });

  test("does not render category tag if there is no category tag", () => {
    renderAndMock({ data: { ...mockProduct, tags: [] } });

    const categoryTag = screen.queryByText("productsAll.mobile");
    expect(categoryTag).not.toBeInTheDocument();
  });
});
