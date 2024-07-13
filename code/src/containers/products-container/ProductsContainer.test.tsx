import { screen } from "@testing-library/react";

import ProductsContainer from "@/containers/products-container/ProductsContainer";
import { ProductsContainerProps } from "@/containers/products-container/ProductsContainer.types";

import { Product } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockProducts: Product[] = [
  {
    id: "123",
    name: "Mobile Phone Samsung Galaxy A55 5G 8/256GB Lilac",
    description:
      'Screen: 6.6" Super AMOLED, 2340x1080 / Samsung Exynos 1480 (4 x 2.75 GHz + 4 x 2.0 GHz) / Main Triple Camera: 50 MP + 12 MP + 5 MP, Front Camera: 32 MP / RAM 8 GB / 256 GB internal storage + microSD (up to 1 TB) / 3G / LTE / 5G / GPS / A-GPS / GLONASS / BDS / Dual SIM support (Nano-SIM) / Android 14 / 5000 mAh',
    status: "AVAILABLE",
    tags: ["category:mobile"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
    price: 500
  },
  {
    id: "124",
    name: "Mobile Phone Apple iPhone 14 Pro 128GB Space Gray",
    description:
      'Screen: 6.1" Super Retina XDR, 2532x1170 / A16 Bionic chip / Main Triple Camera: 48 MP + 12 MP + 12 MP, Front Camera: 12 MP / RAM 6 GB / 128 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM and eSIM) / iOS 16 / 3200 mAh',
    status: "AVAILABLE",
    tags: ["category:mobile"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_1-QodrkqNjm6MWrKqg9ixBBMMfFU40X7.jpg",
    price: 999
  },
  {
    id: "125",
    name: 'Tablet Apple iPad Pro 11" (2022) 128GB Wi-Fi Space Gray',
    description:
      'Screen: 11" Liquid Retina, 2388x1668 / M2 chip / Main Camera: 12 MP, Front Camera: 12 MP / RAM 8 GB / 128 GB internal storage / Wi-Fi / Bluetooth 5.3 / iPadOS 16 / 7538 mAh',
    status: "AVAILABLE",
    tags: ["category:tablet"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/tablet_1-PpRl76SFgEv3Zig14ygkiiabH9f8qS.png",
    price: 799
  },
  {
    id: "126",
    name: "Tablet Samsung Galaxy Tab S8+ 256GB Wi-Fi Silver",
    description:
      'Screen: 12.4" Super AMOLED, 2800x1752 / Snapdragon 8 Gen 1 / Main Camera: 13 MP, Front Camera: 12 MP / RAM 8 GB / 256 GB internal storage + microSD (up to 1 TB) / Wi-Fi / Bluetooth 5.2 / Android 12 / 10090 mAh',
    status: "AVAILABLE",
    tags: ["category:tablet"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/tablet_2-ayF4QQ9ilJtRKlpBLCvwlJkBYddhPO.png",
    price: 999
  },
  {
    id: "127",
    name: 'Laptop Apple MacBook Pro 14" (2023) M2 Pro 512GB Space Gray',
    description:
      'Screen: 14.2" Liquid Retina XDR, 3024x1964 / M2 Pro chip / RAM 16 GB / 512 GB SSD / Wi-Fi 6 / Bluetooth 5.3 / macOS Ventura / 70 Wh battery',
    status: "AVAILABLE",
    tags: ["category:computer"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg",
    price: 1999
  }
];

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn(() => ({ openSnackbar: () => {} }))
}));

jest.mock("@/store/api/cartApi", () => ({
  useAddToCartMutation: jest.fn(() => [jest.fn(), {}])
}));

const renderProductsContainer = (
  extraProps: Partial<ProductsContainerProps> = {}
) => {
  return renderWithProviders(
    <ProductsContainer products={mockProducts} {...extraProps} />
  );
};

describe("Test ProductsContainer", () => {
  test("Should render all 5 products", () => {
    renderProductsContainer();

    const productsElements = screen.getAllByRole("link");

    expect(productsElements.length).toBe(5);
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
});
