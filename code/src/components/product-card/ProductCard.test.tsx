import { fireEvent, screen } from "@testing-library/react";

import ProductCard from "@/components/product-card/ProductCard";

import routes from "@/constants/routes";
import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
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

const mockAddToCartOrOpenDrawer = jest.fn();

jest.mock("@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer");

const renderAndMock = (isProductInCart: boolean) => {
  (useAddToCartOrOpenDrawer as jest.Mock).mockReturnValue({
    isProductInCart,
    addToCartOrOpenDrawer: mockAddToCartOrOpenDrawer
  });

  return renderWithProviders(<ProductCard product={mockProduct} />);
};

describe("ProductCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when product is not in cart", () => {
    let result: ReturnType<typeof renderAndMock>;

    beforeEach(() => {
      result = renderAndMock(false);
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
    });

    test("sets src image on image error", () => {
      const productImage = screen.getByRole("img", { name: mockProduct.name });
      fireEvent.error(productImage);

      expect(productImage).toHaveAttribute("src");
    });

    test("should render product link", () => {
      const productLink = screen.getByRole("link");
      expect(productLink).toHaveAttribute(
        "href",
        routes.productDetails.path(mockProduct.id)
      );
    });

    test("should render icon with plus", () => {
      const addToCartIcon = screen.getByTestId("add-to-cart-icon");
      expect(addToCartIcon).toHaveAttribute(
        "href",
        expect.stringContaining("cart-with-plus")
      );
    });

    test('does not render "active" class', () => {
      const isProductActiveElement = result.container.querySelector(
        ".spa-product-card__cart-button--active"
      );
      expect(isProductActiveElement).not.toBeInTheDocument();
    });
  });

  describe("when product is in cart", () => {
    let result: ReturnType<typeof renderAndMock>;
    beforeEach(() => {
      result = renderAndMock(true);
    });

    test("should render icon with check mark", () => {
      const addToCartIcon = screen.getByTestId("add-to-cart-icon");
      expect(addToCartIcon).toHaveAttribute(
        "href",
        expect.stringContaining("cart-with-check")
      );

      screen.debug();

      const isProductActiveElement = result.container.querySelector(
        ".spa-product-card__cart-button--active"
      );
      expect(isProductActiveElement).toBeInTheDocument();
    });
  });
});
