import { Outlet } from "react-router-dom";
import Header from "@/layouts/header/Header";
import Footer from "@/layouts/footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
