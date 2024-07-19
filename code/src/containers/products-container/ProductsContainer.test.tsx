import { fireEvent, screen } from "@testing-library/react";

import { mockProducts } from "@/containers/products-container/ProductContainer.constants";
import ProductsContainer from "@/containers/products-container/ProductsContainer";
import { ProductsContainerProps } from "@/containers/products-container/ProductsContainer.types";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockAddToCart = jest.fn();

jest.mock("@/hooks/use-add-to-cart/useAddToCart", () => ({
  __esModule: true,
  default: jest.fn(() => [mockAddToCart, {}])
}));

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn(() => ({ openSnackbar: () => {} }))
}));

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  default: () => ({}),
  useUserDetailsSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn(() => false)
}));

jest.mock("@/store/api/cartApi", () => ({
  useGetCartItemsQuery: jest.fn(() => [jest.fn(), {}]),
  useAddToCartMutation: jest.fn(() => [jest.fn(), {}]),
  useRemoveFromCartMutation: jest.fn(() => [jest.fn(), {}]),
  useLazyGetCartItemsQuery: jest.fn(() => [jest.fn(), {}]),
  endpoints: {
    getCartItems: {
      matchFulfilled: jest.fn()
    }
  }
}));

const mockOpenDrawer = jest.fn();

jest.mock("@/context/drawer/DrawerContext", () => ({
  ...jest.requireActual("@/context/drawer/DrawerContext"),
  useDrawerContext: jest.fn(() => ({ openDrawer: mockOpenDrawer }))
}));

jest.mock("@/hooks/use-get-cart/useGetCart", () => ({
  __esModule: true,
  default: jest.fn()
}));

type CartItem = {
  productId: string;
  name: string;
};

const mockCartItem = (items: CartItem[]) => {
  (useGetCart as jest.Mock).mockReturnValue({
    data: {
      items
    },
    isLoading: false,
    isFetching: false
  });
};

type RenderProductsContainer = ProductsContainerProps & {
  items: CartItem[];
};

const renderProductsContainer = ({
  items = [],
  ...extraProps
}: Partial<RenderProductsContainer> = {}) => {
  mockCartItem(items);
  (useUserDetailsSelector as jest.Mock).mockReturnValue({ id: "123" });
  return renderWithProviders(
    <ProductsContainer products={mockProducts.slice(0, 10)} {...extraProps} />
  );
};

describe("Test ProductsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should render 10 products", () => {
    renderProductsContainer();

    const productsElements = screen.getAllByRole("link");

    expect(productsElements.length).toBe(10);
  });

  test("Should render correct amount of skeletons", () => {
    const { container } = renderProductsContainer({
      isLoading: true,
      loadingItemsCount: 10,
      products: []
    });

    const possibleProduct = screen.queryByRole("link");
    const skeletons = container.getElementsByClassName("spa-product-skeleton");

    expect(possibleProduct).not.toBeInTheDocument();
    expect(skeletons.length).toBe(10);
  });

  test("Should accept and set className", () => {
    const { container } = renderProductsContainer({ className: "products" });

    const gridContainer = container.getElementsByClassName("products")[0];

    expect(gridContainer).toBeInTheDocument();
  });

  test("Should render error", () => {
    renderProductsContainer({ isError: true });

    const errorElement = screen.getByText("errors.somethingWentWrong");

    expect(errorElement).toBeInTheDocument();
  });

  test("Should render custom passed error", () => {
    renderProductsContainer({ isError: true, errorMessage: "error" });

    const errorElement = screen.getByText("error");

    expect(errorElement).toBeInTheDocument();
  });

  test("Should open drawer when product is in cart and add-to-cart button is clicked", () => {
    renderProductsContainer({
      items: [{ productId: mockProducts[0].id, name: mockProducts[0].name }]
    });

    const addToCartButton = screen.getAllByTestId("add-to-cart-button")[0];

    fireEvent.click(addToCartButton);

    expect(mockOpenDrawer).toHaveBeenCalled();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("Should add product to the cart when add-to-cart button is clicked", () => {
    renderProductsContainer();

    const addToCartButton = screen.getAllByTestId("add-to-cart-button")[1];

    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      productId: mockProducts[1].id,
      name: mockProducts[1].name,
      image: mockProducts[1].image,
      productPrice: mockProducts[1].price,
      quantity: 1,
      calculatedPrice: mockProducts[1].price
    });
    expect(mockOpenDrawer).not.toHaveBeenCalled();
  });
});
