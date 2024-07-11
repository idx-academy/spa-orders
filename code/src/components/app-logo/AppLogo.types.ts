import { ComponentPropsWithoutRef } from "react";

import { COMPONENT } from "@/components/app-logo/AppLogo";

export type AppLogoType = Omit<
  ComponentPropsWithoutRef<typeof COMPONENT>,
  "component" | "src" | "alt"
>;
