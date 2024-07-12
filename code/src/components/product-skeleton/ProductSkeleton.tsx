import AppBox from "@/components/app-box/AppBox";
import AppSkeleton from "@/components/app-skeleton/AppSkeleton";

import "@/components/product-skeleton/ProductSkeleton.scss";

const ProductSkeleton = () => {
  return (
    <AppBox
      className="spa-product-skeleton"
      data-testid="spa-product-skeleton"
      data-cy="product-skeleton"
    >
      <AppSkeleton variant="rectangular" height={264} width={254} />
      <AppSkeleton variant="text" width={254} />
      <AppSkeleton variant="text" width={254} />
    </AppBox>
  );
};

export default ProductSkeleton;
