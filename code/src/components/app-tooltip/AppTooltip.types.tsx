import { ReactNode } from "react";

import { TooltipProps } from "@mui/material/Tooltip";

export type AppTooltipProps = Omit<TooltipProps, "title" | "arrow"> & {
  titleTranslationKey?: string;
  children: ReactNode;
};
