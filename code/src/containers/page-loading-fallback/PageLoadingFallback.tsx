import { PageLoadingFallbackProps } from "@/containers/page-loading-fallback/PageLoadingFallback.types";

import AppBox from "@/components/app-box/AppBox";
import AppSkeleton from "@/components/app-skeleton/AppSkeleton";

import cn from "@/utils/cn/cn";

import "@/containers/page-loading-fallback/PageLoadingFallback.scss";

const PageLoadingFallback = ({
  fullScreen,
  className
}: PageLoadingFallbackProps) => {
  return (
    <AppBox
      className={cn(
        "page-loading-fallback",
        fullScreen && "page-loading-fallback__full-screen",
        className
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
