import { screen } from "@testing-library/react";
import { useParams } from "react-router-dom";

import ProductDetailsPage from "@/pages/product-details/ProductDetailsPage";
import { productNotFoundRedirectConfig } from "@/pages/product-details/ProductsDetailsPage.constants";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockRenderRedirectComponent = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    renderRedirectComponent: mockRenderRedirectComponent
  }))
}));

jest.mock(
  "@/pages/product-details/components/product-details-container/ProductDetailsContainer",
  () => ({
    __esModule: true,
    default: () => <div>ProductDetailsContainer</div>
  })
);

const renderAndMock = (productId?: string) => {
  (useParams as jest.Mock).mockReturnValue({ productId });
  renderWithProviders(<ProductDetailsPage />);
};

describe("ProductsDetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to 404 page if productId is not provided", () => {
    renderAndMock();
    expect(mockRenderRedirectComponent).toHaveBeenCalledWith(
      productNotFoundRedirectConfig
    );
  });

  test("renders product details container when product id is defined", () => {
    renderAndMock("1");
    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();

    const productDetailsContainer = screen.getByText("ProductDetailsContainer");
    expect(productDetailsContainer).toBeInTheDocument();
  });
});
