import Skeleton from "@mui/material/Skeleton";
import AppBox from "@/components/app-box/AppBox";

import "@/layouts/page-loading-fallback/PageLoadingFallback.scss";

const PageLoadingFallback = () => {
  return (
    <AppBox className="page-loading-fallback">
      <Skeleton variant="rounded" className="page-loading-fallback__skeleton" />
    </AppBox>
  );
};

export default PageLoadingFallback;
