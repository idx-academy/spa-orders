import Skeleton from "@mui/material/Skeleton";
import AppBox from "@/components/app-box/AppBox";

import cn from "@/utils/cn";

import { PageLoadingFallbackProps } from "@/layouts/page-loading-fallback/PageLoadingFallback.types";

import "@/layouts/page-loading-fallback/PageLoadingFallback.scss";

const PageLoadingFallback = ({ fullScreen }: PageLoadingFallbackProps) => {
  return (
    <AppBox
      className={cn(
        "page-loading-fallback",
        fullScreen && "page-loading-fallback__full-screen"
      )}
      data-testid="page-loading-fallback"
    >
      <Skeleton
        data-testid="page-loading-fallback-skeleton"
        variant="rounded"
        className="page-loading-fallback__skeleton"
      />
    </AppBox>
  );
};

export default PageLoadingFallback;
