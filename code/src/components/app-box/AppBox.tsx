import { ForwardedRef, HTMLProps, forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";

type AppBoxProps<TElement> = BoxProps & HTMLProps<TElement>;

const AppBox = forwardRef(
  <TElement,>(props: AppBoxProps<TElement>, ref: ForwardedRef<unknown>) => {
    return <Box ref={ref} {...props} />;
  }
);

export default AppBox;
