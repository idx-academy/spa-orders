export type ProductStatus = "AVAILABLE";

export type Product = {
  id: string;
  name: string;
  description: string;
  status: ProductStatus;
  tags: string[];
  image: string;
  price: number;
};

export type ManagerProductStatus = "VISIBLE" | "HIDDEN";

export type ManagerProduct = {
  id: string;
  name: string;
  description: string;
  imageLink: string;
  quantity: number;
  price: number;
  createdAt: string;
  status: ManagerProductStatus;
  tags: string[];
};
