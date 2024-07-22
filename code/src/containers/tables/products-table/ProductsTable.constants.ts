import { ManagerProduct } from "@/types/product.types";

export const productsTableColumns = [
  "productsTable.columns.image",
  "productsTable.columns.name",
  "productsTable.columns.status",
  "productsTable.columns.category",
  "productsTable.columns.quantity",
  "productsTable.columns.price",
  "productsTable.columns.date",
  ""
];

export const productStatuToTranslationKeyMap = {
  VISIBLE: "product.status.visible",
  HIDDEN: "product.status.hidden"
} as const;

export const mockProducts: ManagerProduct[] = [
  {
    id: "8efbee82-8a0c-407a-a4c0-16bbad40a23e",
    name: "Mobile Phone Apple iPhone 14 Pro 128GB Space Gray",
    description:
      'Screen: 6.1" Super Retina XDR, 2532x1170 / A16 Bionic chip / Main Triple Camera: 48 MP + 12 MP + 12 MP, Front Camera: 12 MP / RAM 6 GB / 128 GB internal storage / 3G / LTE / 5G / GPS / GLONASS / Dual SIM support (Nano-SIM and eSIM) / iOS 16 / 3200 mAh',
    imageLink:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_1-QodrkqNjm6MWrKqg9ixBBMMfFU40X7.jpg",
    quantity: 10,
    price: 100.45,
    createdAt: "2024-07-21T11:37:31.744Z",
    status: "VISIBLE",
    tags: ["category:computer"]
  },
  {
    id: "8efbee82-8a0c-407a-a4c0-16bbad40a23e",
    name: "Mobile Phone Samsung Galaxy A55 5G 8/256GB Lilac",
    description:
      'Screen: 6.6" Super AMOLED, 2340x1080 / Samsung Exynos 1480 (4 x 2.75 GHz + 4 x 2.0 GHz) / Main Triple Camera: 50 MP + 12 MP + 5 MP, Front Camera: 32 MP / RAM 8 GB / 256 GB internal storage + microSD (up to 1 TB) / 3G / LTE / 5G / GPS / A-GPS / GLONASS / BDS / Dual SIM support (Nano-SIM) / Android 14 / 5000 mAh',
    imageLink:
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
    quantity: 10,
    price: 100.45,
    createdAt: "2024-07-21T11:37:31.744Z",
    status: "VISIBLE",
    tags: ["category:computer"]
  }
];
