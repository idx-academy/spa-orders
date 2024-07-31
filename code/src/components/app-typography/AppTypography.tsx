import { ElementType } from "react";
import { FormattedMessage } from "react-intl";

import Typography from "@mui/material/Typography";

import {
  AppTypographyProps,
  AppTypographyVariant,
  HeadingVariant
} from "@/components/app-typography/AppTypography.types";

import cn from "@/utils/cn/cn";

import "@/components/app-typography/AppTypography.scss";

function getDefaultComponentTag(variant: AppTypographyVariant) {
  if (variant.startsWith("h")) {
    return variant as HeadingVariant;
  }

  if (variant.startsWith("caption")) {
    return "span";
  }

  return "p";
}

const AppTypography = <T extends ElementType = "span">({
  variant = "body",
  className,
  fontWeight = "regular",
  component,
  children,
  translationKey,
  translationProps,
  ...props
}: AppTypographyProps<T>) => {
  const TypographyContent = translationKey ? (
    <FormattedMessage id={translationKey} {...translationProps} />
  ) : (
    children
  );

  return (
    <Typography
      component={component ?? getDefaultComponentTag(variant)}
      className={cn(
        `spa-typography`,
        `spa-typography__${variant}`,
        `spa-typography__${fontWeight}`,
        className
      )}
      {...props}
    >
      {TypographyContent}
    </Typography>
  );
};

export default AppTypography;
