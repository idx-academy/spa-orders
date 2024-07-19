import { ReactNode } from "react";

import { TooltipProps } from "@mui/material/Tooltip";

import { TranslationProps } from "@/components/app-typography/AppTypography.types";

export type AppTooltipProps = Omit<TooltipProps, "title" | "arrow"> & {
  titleTranslationKey?: string;
  titleTranslationProps?: TranslationProps;
  children: ReactNode;
};
