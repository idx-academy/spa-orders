import { ComponentProps, ElementType, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import Typography, { TypographyProps } from "@mui/material/Typography";
import "@/components/app-typography/AppTypography.scss";

type HeadingVariant = "h1" | "h2" | "h3";
type TextVariant =
  | "body"
  | "concept"
  | "subtitle1"
  | "subtitle2"
  | "caption"
  | "caption-small";
export type AppTypographyVariant = HeadingVariant | TextVariant;

type BaseComponent = ElementType<any, keyof JSX.IntrinsicElements>;

type AppTypographyProps<T extends BaseComponent = "span"> = Omit<
  TypographyProps<T>,
  "variant" | "children"
> & {
  variant?: AppTypographyVariant;
  component?: T;
} & (
    | {
        translationKey: string;
        translationProps?: Omit<ComponentProps<typeof FormattedMessage>, "id">;
        children?: never;
      }
    | {
        translationKey?: never;
        translationProps?: never;
        children: ReactNode;
      }
  );

function getDefaultComponentTag(variant: AppTypographyVariant) {
  if (variant.startsWith("h")) {
    return variant as HeadingVariant;
  }

  if (variant.startsWith("caption")) {
    return "span";
  }

  return "p";
}

const AppTypography = <T extends BaseComponent = "span">({
  variant = "body",
  className,
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
      className={`spa-typography spa-typography__${variant} ${className}`}
      {...props}
    >
      {TypographyContent}
    </Typography>
  );
};

export default AppTypography;
