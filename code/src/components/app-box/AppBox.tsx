import { ForwardedRef, forwardRef } from "react";

import Box from "@mui/material/Box";

import { AppBoxProps } from "@/components/app-box/AppBox.types";

const AppBox = forwardRef(
  <TElement,>(props: AppBoxProps<TElement>, ref: ForwardedRef<HTMLElement>) => {
    return <Box ref={ref} {...props} />;
  }
);

AppBox.displayName = "AppBox";

export default AppBox;
