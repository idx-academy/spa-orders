import { ManagerProduct } from "@/types/product.types";

export type ProductsTableBodyProps = {
  product: ManagerProduct;
};

export type ProductsTableProps = {
  products: ManagerProduct[];
};

export type ProductsTableHeadProps = {
  head: string;
};
