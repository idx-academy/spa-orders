import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";

import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import DashboardProductPage from "@/pages/dashboard/dashboard-product/DashboardProductPage";

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

jest.mock("react-router-dom", () => ({
  useParams: jest.fn()
}));

jest.mock(
  "@/pages/dashboard/dashboard-product/components/dashboard-product-container/DashboardProductContainer",
  () => ({
    __esModule: true,
    default: () => <div>Dashboard Product Container</div>
  })
);

type MockRenderParams = {
  productId?: string | null;
};

const defaultParams = {
  productId: validUUID
};

const mockAndRender = ({ productId }: MockRenderParams = defaultParams) => {
  (useParams as jest.Mock).mockReturnValue({ productId });
  render(<DashboardProductPage />);
};

describe("Test DashboardProductPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly if product id is valid", () => {
    mockAndRender();

    const productContainer = screen.getByText("Dashboard Product Container");

    expect(productContainer).toBeInTheDocument();
  });

  test("Should redirect to not found page if productId is not provided", () => {
    mockAndRender({ productId: null });

    const label = screen.getByText("product.productNotFound");
    const productContainer = screen.queryByText("Product Container");

    expect(label).toBeInTheDocument();
    expect(productContainer).not.toBeInTheDocument();
  });

  test("Should redirect to not found page if productId is not valid", () => {
    mockAndRender({ productId: "invalid" });

    const label = screen.getByText("product.productNotFound");
    const productContainer = screen.queryByText("Dashboard Product Container");

    expect(label).toBeInTheDocument();
    expect(productContainer).not.toBeInTheDocument();
  });
});
