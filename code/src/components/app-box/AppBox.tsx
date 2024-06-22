import Box, { BoxProps } from "@mui/material/Box";
import { ImgHTMLAttributes } from "react";

type AppBoxProps = BoxProps & ImgHTMLAttributes<HTMLImageElement>;

const AppBox = (props: AppBoxProps) => {
  return <Box {...props} />;
};

export default AppBox;
