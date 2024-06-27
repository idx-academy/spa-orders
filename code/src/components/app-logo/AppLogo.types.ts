import { ComponentPropsWithoutRef } from "react";

export const COMPONENT = "img";

export type AppLogoType = Omit<
  ComponentPropsWithoutRef<typeof COMPONENT>,
  "component" | "src" | "alt"
>;
