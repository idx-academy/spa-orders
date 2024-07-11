import { ComponentProps, ElementType, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { TypographyProps } from "@mui/material/Typography";

export type HeadingVariant = "h1" | "h2" | "h3";
export type TextVariant =
  | "body"
  | "concept"
  | "subtitle1"
  | "subtitle2"
  | "caption"
  | "caption-small";
export type AppFontWeightVariant = "regular" | "extra-bold";
export type AppTypographyVariant = HeadingVariant | TextVariant;

export type AppTypographyProps<T extends ElementType = "span"> = Omit<
  TypographyProps<T>,
  "variant" | "children" | "fontWeight"
> & {
  variant?: AppTypographyVariant;
  component?: T;
  fontWeight?: AppFontWeightVariant;
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
