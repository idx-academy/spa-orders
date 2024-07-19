import Drawer from "@mui/material/Drawer";

import { AppDrawerProps } from "@/components/app-drawer/AppDrawer.types";

/*
  Avoid using this component directly in your components, prefer using useDrawerContext
  If the content of your drawer requires to be rerendered after dynamic state changes in parent component and drawer context not work for you, then use this component
*/

const AppDrawer = ({ isOpen, ...props }: AppDrawerProps) => {
  return (
    <Drawer open={isOpen} anchor="right" transitionDuration={400} {...props} />
  );
};

export default AppDrawer;
