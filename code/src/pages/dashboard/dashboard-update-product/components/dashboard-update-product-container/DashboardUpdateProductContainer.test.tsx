import { render, screen } from "@testing-library/react";

import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import DashboardUpdateProductContainer from "@/pages/dashboard/dashboard-update-product/components/dashboard-update-product-container/DashboardUpdateProductContainer";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import { RTKQueryReturnState } from "@/types/common";
import { GetManagerProductByIdResponse } from "@/types/product.types";

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

const mockData = {} as GetManagerProductByIdResponse;

const defaultParams = {
  data: mockData,
  isLoading: false,
  error: null
};

const mockAndRender = (
  response: Partial<
    RTKQueryReturnState<GetManagerProductByIdResponse, unknown>
  > = defaultParams
) => {
  (useGetManagerProductQuery as jest.Mock).mockReturnValue(response);
  render(<DashboardUpdateProductContainer productId={validUUID} />);
};

describe("Test DashboardUpdateProductPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render title", () => {
    mockAndRender();

    const title = screen.getByText("product.update.title");

    expect(title).toBeInTheDocument();
  });

  test("Should call useGetManagerProductQuery with productId", () => {
    mockAndRender();

    expect(useGetManagerProductQuery).toHaveBeenCalledWith({
      productId: validUUID
    });
  });

  test("Should show error message if there is some request error that is not 404", () => {
    mockAndRender({
      error: { status: 500 },
      data: mockData
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
