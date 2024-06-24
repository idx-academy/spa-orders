import { Outlet } from "react-router-dom";
import AppHeader from "@/layouts/app-header/AppHeader";
import AppFooter from "@/layouts/app-footer/AppFooter";

const RootLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default RootLayout;
