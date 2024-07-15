import MenuItem from "@mui/material/MenuItem";

import { AppMenuItemProps } from "@/components/app-menu-item/AppMenuItem.types";

const AppMenuItem = (props: AppMenuItemProps) => {
  return <MenuItem {...props} />;
};

export default AppMenuItem;
