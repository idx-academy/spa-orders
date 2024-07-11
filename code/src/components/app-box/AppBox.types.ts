import { HTMLProps } from "react";

import { BoxProps } from "@mui/material/Box";

export type AppBoxProps<TElement> = BoxProps & HTMLProps<TElement>;
