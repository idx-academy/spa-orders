import { Outlet } from "react-router-dom";
import Header from "@/layouts/header/Header";
import AppFooter from "@/layouts/app-footer/AppFooter";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default RootLayout;
