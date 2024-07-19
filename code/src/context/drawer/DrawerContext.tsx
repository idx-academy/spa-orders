import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState
} from "react";

import AppDrawer from "@/components/app-drawer/AppDrawer";

export type DrawerContextType = {
  openDrawer: (component: ReactElement) => void;
  toggleDrawer: (component?: ReactElement) => void;
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

  const toggleDrawer = (component?: ReactElement) => {
    component ? openDrawer(component) : closeDrawer();
  };

  const drawerContent = (
    <AppDrawer isOpen={isOpen} onClose={closeDrawer}>
      {drawer}
    </AppDrawer>
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
