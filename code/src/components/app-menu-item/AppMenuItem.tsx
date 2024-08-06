import { forwardRef } from "react";

import MenuItem from "@mui/material/MenuItem";

import { AppMenuItemProps } from "@/components/app-menu-item/AppMenuItem.types";

const AppMenuItem = forwardRef<HTMLLIElement, AppMenuItemProps>(
  (props, ref) => {
    return <MenuItem {...props} ref={ref} />;
  }
);

AppMenuItem.displayName = "AppMenuItem";

export default AppMenuItem;
