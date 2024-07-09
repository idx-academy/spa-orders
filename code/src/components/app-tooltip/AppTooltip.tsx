import Tooltip from "@mui/material/Tooltip";

import { AppTooltipProps } from "@/components/app-tooltip/AppTooltip.types";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/components/app-tooltip/AppTooltip.scss";

const AppTooltip = ({
  titleTranslationKey,
  children,
  ...props
}: AppTooltipProps) => {
  const translatedTitle = titleTranslationKey ? (
    <AppTypography
      className="spa-app-tooltip"
      translationKey={titleTranslationKey}
    />
  ) : undefined;

  return (
    <Tooltip placement="top" title={translatedTitle} arrow {...props}>
      {children}
    </Tooltip>
  );
};

export default AppTooltip;
