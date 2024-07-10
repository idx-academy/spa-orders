import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState
} from "react";

import Drawer from "@mui/material/Drawer";

type DrawerContextType = {
  openDrawer: (component: ReactElement) => void;
  toggleDrawer: (component: ReactElement) => void;
  closeDrawer: () => void;
};

type DrawerProviderProps = Required<PropsWithChildren>;

const DrawerContext = createContext<DrawerContextType | null>(null);

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [drawer, setDrawer] = useState<ReactElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = (component: ReactElement) => {
    setIsOpen(true);
    setDrawer(component);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (component: ReactElement) => {
    drawer ? closeDrawer() : openDrawer(component);
  };

  const drawerContent = (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      anchor="right"
      transitionDuration={400}
    >
      {drawer}
    </Drawer>
  );

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, toggleDrawer }}>
      {drawerContent}
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return context;
};

export { DrawerProvider, useDrawerContext, DrawerContext };
