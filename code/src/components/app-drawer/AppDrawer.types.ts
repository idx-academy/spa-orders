import { DrawerProps } from "@mui/material/Drawer";

export type AppDrawerProps = Omit<
  DrawerProps,
  "open" | "anchor" | "transitionDuration"
> & {
  isOpen: boolean;
};
