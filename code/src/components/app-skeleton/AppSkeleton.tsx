import Skeleton from "@mui/material/Skeleton";

import { AppSkeletonProps } from "@/components/app-skeleton/AppSkeleton.types";

const AppSkeleton = (props: AppSkeletonProps) => {
  return <Skeleton {...props} />;
};

export default AppSkeleton;
