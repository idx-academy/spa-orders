import AppSkeleton from "../app-skeleton/AppSkeleton";
import AppBox from "@/components/app-box/AppBox";

import "@/components/product-skeleton/ProductSkeleton.scss";

const ProductSkeleton = () => {
  return (
    <AppBox className="spa-product-skeleton" data-testid="spa-product-skeleton">
      <AppSkeleton variant="rectangular" height={264} width={254} />
      <AppSkeleton variant="text" width={254} />
      <AppSkeleton variant="text" width={254} />
    </AppBox>
  );
};

export default ProductSkeleton;
