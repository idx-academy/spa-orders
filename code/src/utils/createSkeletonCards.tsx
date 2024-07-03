import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

const createProductSkeletons = (iterations: number) => {
  return Array.from({ length: iterations }, (_, index) => (
    <ProductSkeleton key={index} />
  ));
};

export default createProductSkeletons;
