import AppBox from "@/components/app-box/AppBox";
import AppSkeleton from "@/components/app-skeleton/AppSkeleton";

import cn from "@/utils/cn/cn";

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
      <AppSkeleton
        data-testid="page-loading-fallback-skeleton"
        variant="rounded"
        className="page-loading-fallback__skeleton"
      />
    </AppBox>
  );
};

export default PageLoadingFallback;
