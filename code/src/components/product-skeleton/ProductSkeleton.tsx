import { Skeleton } from "@mui/material";
import AppBox from "@/components/app-box/AppBox";

import "@/components/product-skeleton/ProductSkeleton.scss";

const ProductSkeleton = () => {
  return (
    <AppBox className="spa-product-skeleton">
      <Skeleton variant="rectangular" height={264} width={254} />
      <Skeleton variant="text" width={254} />
      <Skeleton variant="text" width={254} />
    </AppBox>
  );
};

export default ProductSkeleton;
