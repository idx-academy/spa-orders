import { Product } from "@/types/product.types";

export type ProductCardProps = {
  product: Product;
  onAddToCart: (item: Product) => void;
};
