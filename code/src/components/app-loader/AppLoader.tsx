import CircularProgress from "@mui/material/CircularProgress";
import { AppLoaderProps } from "@/components/app-loader/AppLoader.types";
import cn from "@/utils/cn/cn";

import "@/components/app-loader/AppLoader.scss";

const AppLoader = ({
  className,
  size = "medium",
  variant = "contained",
  ...props
}: AppLoaderProps) => {
  return (
    <CircularProgress
      className={cn(
        "spa-loader",
        `spa-loader__${variant}`,
        `spa-loader__${size}`,
        className
      )}
      {...props}
    />
  );
};

export default AppLoader;
