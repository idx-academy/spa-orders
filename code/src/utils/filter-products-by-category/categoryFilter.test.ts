import { Product } from "@/types/product.types";
import categoryFilter from "@/utils/filter-products-by-category/categoryFilter";

const backendDate: Product[] = [
  {
    id: "79dbde99-da4b-477a-b8f9-d91fed15a392",
    name: "Mobile Phone OnePlus 11 5G 256GB Titan Black",
    description:
      'Screen: 6.7" Fluid AMOLED, 3216x1440 / Snapdragon 8 Gen 2 / Main Triple Camera: 50 MP + 48 MP + 32 MP, Front Camera: 16 MP / RAM 12 GB / 256 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM) / Android 13 / 5000 mAh',
    status: "AVAILABLE",
    tags: ["category:mobile"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/mobile-5LJz3MWmzUWUPOq6wT3Zw4UPKSBYb1.jpg",
    price: 799
  },
  {
    id: "c56a4180-65aa-42ec-a945-5fd21dec0544",
    name: "Mobile Phone Xiaomi Mi 12 5G 128GB Black",
    description:
      'Screen: 6.28" AMOLED, 2400x1080 / Snapdragon 8 Gen 1 / Main Triple Camera: 50 MP + 13 MP + 5 MP, Front Camera: 32 MP / RAM 8 GB / 128 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM) / Android 12 / 4500 mAh',
    status: "AVAILABLE",
    tags: ["category:mobile"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/mobile_12-xE79HUHk1WLuloB7jNfNIeBN0yq5NH.jpg",
    price: 699
  },
  {
    id: "602ac1b3-41fc-4b4d-8de8-c4d9c86a5cf0",
    name: "Mobile Phone Samsung Galaxy S22 Ultra 5G 512GB Phantom Black",
    description:
      'Screen: 6.8" Dynamic AMOLED 2X, 3088x1440 / Exynos 2200 / Main Quad Camera: 108 MP + 10 MP + 10 MP + 12 MP, Front Camera: 40 MP / RAM 12 GB / 512 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM) / Android 12 / 5000 mAh',
    status: "AVAILABLE",
    tags: ["category:mobile"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/mobile_123-ABvXorqrch3nhTP6ycbmt13t29EuKs.jpg",
    price: 1099
  },
  {
    id: "a512ff32-358c-4650-b303-1abb696402de",
    name: 'Laptop ASUS ZenBook 14" Intel Core i5 512GB SSD Pine Grey',
    description:
      'Screen: 14" OLED, 2880x1800 / Intel Core i5-1240P / RAM 16 GB / 512 GB SSD / Wi-Fi 6 / Bluetooth 5.2 / Windows 11 Home / 67 Wh battery',
    status: "AVAILABLE",
    tags: ["category:computer"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer-copy-0-wlgCGUS3SKMFcugVqvFYYzVGrY5OGh.png",
    price: 1299
  },
  {
    id: "041b90f2-c8fb-49de-9dc1-f1a3bc0ad323",
    name: "Laptop Lenovo ThinkPad X1 Carbon Gen 10 (2023) Intel Core i7 1TB SSD Black",
    description:
      'Screen: 14" IPS, 1920x1200 / Intel Core i7-1260P / RAM 16 GB / 1TB SSD / Wi-Fi 6E / Bluetooth 5.2 / Windows 11 Pro / 57 Wh battery',
    status: "AVAILABLE",
    tags: ["category:computer"],
    image:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer-wDPU7h0cjIZoXklhV0kykrFYJqKAjT.png",
    price: 1899
  }
];
const category = "computer";

describe("filter products by category", () => {
  test("function returns an array of products having a certain category", () => {
    const filteredProductsList = categoryFilter(category, backendDate);
    expect(filteredProductsList?.length).toBe(2);
  });
});
