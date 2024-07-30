import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";

import { RedirectConfig } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import DashboardUpdateProductPage from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage";
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

jest.mock("react-router-dom", () => ({
  useParams: jest.fn()
}));

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductQuery: jest.fn()
}));

const mockData = {} as GetManagerProductByIdResponse;

type MockRenderParams = {
  productId: string | null;
  rtkqResponse: Partial<
    RTKQueryReturnState<GetManagerProductByIdResponse, unknown>
  >;
};

const defaultParams = {
  productId: validUUID,
  rtkqResponse: { data: mockData, isLoading: false, error: null }
};

const mockAndRender = ({
  productId,
  rtkqResponse
}: Partial<MockRenderParams> = defaultParams) => {
  (useParams as jest.Mock).mockReturnValue({ productId });
  (useGetManagerProductQuery as jest.Mock).mockReturnValue(rtkqResponse);
  render(<DashboardUpdateProductPage />);
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

  test("Should redirect to not found page if productId is not provided", () => {
    mockAndRender({ productId: null, rtkqResponse: {} });

    const label = screen.getByText("product.productNotFound");

    expect(label).toBeInTheDocument();
    expect(useGetManagerProductQuery).not.toHaveBeenCalled();
  });

  test("Should redirect to not found page if productId is not valid", () => {
    mockAndRender({ productId: "invalid", rtkqResponse: {} });

    const label = screen.getByText("product.productNotFound");

    expect(label).toBeInTheDocument();
    expect(useGetManagerProductQuery).not.toHaveBeenCalled();
  });

  test("Should show error message if there is some request error that is not 404", () => {
    mockAndRender({
      productId: validUUID,
      rtkqResponse: { error: { status: 500 }, data: mockData }
    });

    const label = screen.getByText("errors.somethingWentWrong");
    expect(label).toBeInTheDocument();
  });

  test("Should display loadign message while loading", () => {
    mockAndRender({
      productId: validUUID,
      rtkqResponse: { isLoading: true }
    });

    const label = screen.getByTestId("page-loading-fallback");
    expect(label).toBeInTheDocument();
  });
});
