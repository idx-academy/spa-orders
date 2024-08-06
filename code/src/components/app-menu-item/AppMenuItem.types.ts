import { ForwardedRef } from "react";

import { MenuItemProps } from "@mui/material/MenuItem";

export type AppMenuItemProps = MenuItemProps & {
  ref?: ForwardedRef<HTMLLIElement>;
};
