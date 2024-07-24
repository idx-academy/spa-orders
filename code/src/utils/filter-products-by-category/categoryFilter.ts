import { Product } from "@/types/product.types";

const categoryFilter = (category: string | null, productsList?: Product[]) => {
  if (!category) {
    return productsList;
  }
  return productsList?.filter((product) => {
    return product.tags.includes(`category:${category}`);
  });
};

export default categoryFilter;
