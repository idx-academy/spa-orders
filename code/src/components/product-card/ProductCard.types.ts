import { HandleCartIconClickParam } from "@/containers/products-container/ProductsContainer.types";

import { Product } from "@/types/product.types";

export type ProductCardProps = {
  product: Product;
  isInCart: boolean;
  isUserAuthorized: boolean;
  onCartIconClick: (item: HandleCartIconClickParam) => void;
};
