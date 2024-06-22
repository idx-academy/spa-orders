import { ImgHTMLAttributes } from "react";
import Box, { BoxProps } from "@mui/material/Box";

type AppBoxProps = BoxProps & ImgHTMLAttributes<HTMLImageElement>;

const AppBox = (props: AppBoxProps) => {
  return <Box {...props} />;
};

export default AppBox;