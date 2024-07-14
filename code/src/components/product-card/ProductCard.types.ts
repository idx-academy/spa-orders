import { ProductWithIsInCart } from "@/types/product.types";

export type ProductCardProps = {
  product: ProductWithIsInCart;
  onCartIconClick: (item: ProductWithIsInCart) => void;
};
