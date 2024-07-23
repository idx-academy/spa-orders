import { Product } from "@/types/product.types";

const categoryFilter = (
  category: string | null,
  productsList: Product[] | undefined
) => {
  let filteredProductsList;
  if (category) {
    filteredProductsList = productsList?.filter((product) => {
      return product.tags.includes(`category:${category}`);
    });
  } else {
    filteredProductsList = productsList;
  }
  return filteredProductsList;
};

export default categoryFilter;
