import { fireEvent, screen } from "@testing-library/react";

import ProductCard from "@/components/product-card/ProductCard";

import { Product } from "@/types/product.types";
import formatPrice from "@/utils/format-price/formatPrice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockProduct: Product = {
  id: "123",
  name: "Mobile Phone Samsung Galaxy A55 5G 8/256GB Lilac",
  description:
    'Screen: 6.6" Super AMOLED, 2340x1080 / Samsung Exynos 1480 (4 x 2.75 GHz + 4 x 2.0 GHz) / Main Triple Camera: 50 MP + 12 MP + 5 MP, Front Camera: 32 MP / RAM 8 GB / 256 GB internal storage + microSD (up to 1 TB) / 3G / LTE / 5G / GPS / A-GPS / GLONASS / BDS / Dual SIM support (Nano-SIM) / Android 14 / 5000 mAh',
  status: "AVAILABLE",
  tags: ["category:mobile"],
  image:
    "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
  price: 500
};

const mockCartIconClickHandler = jest.fn();
const mockSetState = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn((init) => [init, mockSetState])
}));

describe("ProductCard component", () => {
  beforeEach(() => {
    renderWithProviders(
      <ProductCard
        product={mockProduct}
        onCartIconClick={mockCartIconClickHandler}
        isUserAuthorized
        isInCart
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render product name", () => {
    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });

  test("should render product price", () => {
    const productPrice = screen.getByText(formatPrice(mockProduct.price));
    expect(productPrice).toBeInTheDocument();
  });

  test("should render product description", () => {
    const productDescription = screen.getByText(mockProduct.description);
    expect(productDescription).toBeInTheDocument();
  });

  test("should render product image with correct src and alt attributes", () => {
    const productImage = screen.getByRole("img", { name: mockProduct.name });
    expect(productImage).toHaveAttribute("src", mockProduct.image);
    expect(productImage).toHaveAttribute("alt", mockProduct.name);
  });

  test("should render product link", () => {
    const productLink = screen.getByRole("link");
    expect(productLink).toHaveAttribute("href", "/");
  });

  test("should call useState on mount", () => {
    expect(mockSetState).toHaveBeenCalledWith(true);
  });

  test("Should call functions on cart icon click", () => {
    const cartIcon = screen.getByTestId("add-to-cart-button");

    fireEvent.click(cartIcon);

    expect(mockSetState).toHaveBeenNthCalledWith(3, true); // 3 times becase mui button internally calls it once
    expect(mockCartIconClickHandler).toHaveBeenCalledWith({
      ...mockProduct,
      isInCart: true
    });
  });

  test("should render cart icon with right class if product is in cart", () => {
    const cartIcon = screen.getByTestId("add-to-cart-button");

    expect(cartIcon).toHaveClass("spa-product-card__cart-button--active");
  });
});
