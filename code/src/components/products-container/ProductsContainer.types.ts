import { Product } from "@/types/product.types";

export type ProductsContainerProps = {
  products: Product[];
  isLoading?: boolean;
  loadingItemsCount?: number;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
};
