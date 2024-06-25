import { ForwardedRef, HTMLProps, forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";

type AppBoxProps<TElement> = BoxProps & HTMLProps<TElement>;

const AppBox = forwardRef(
  <TElement,>(props: AppBoxProps<TElement>, ref: ForwardedRef<HTMLElement>) => {
    return <Box ref={ref} {...props} />;
  }
);

AppBox.displayName = "AppBox";

export default AppBox;
