import { forwardRef } from "react";

import Tooltip from "@mui/material/Tooltip";

import AppBox from "@/components/app-box/AppBox";
import { AppTooltipProps } from "@/components/app-tooltip/AppTooltip.types";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/components/app-tooltip/AppTooltip.scss";

const AppTooltip = forwardRef<HTMLDivElement, AppTooltipProps>(function (
  { titleTranslationKey, titleTranslationProps, children, ...props },
  ref
) {
  const translatedTitle = titleTranslationKey ? (
    <AppTypography
      className="spa-app-tooltip"
      translationKey={titleTranslationKey}
      translationProps={titleTranslationProps}
    />
  ) : undefined;

  return (
    <Tooltip title={translatedTitle} arrow {...props}>
      <AppBox ref={ref}>{children}</AppBox>
    </Tooltip>
  );
});

AppTooltip.displayName = "AppTooltip";

export default AppTooltip;
