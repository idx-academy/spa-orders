import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import PageLoadingFallback from "@/layouts/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";

import { DrawerProvider } from "@/context/DrawerContext";
import { ModalProvider } from "@/context/ModalContext";

import "@/layouts/root-layout/RootLayout.scss";

const RootLayout = () => {
  return (
    <ModalProvider>
      <DrawerProvider>
        <AppBox className="root-layout">
          <ScrollRestoration />
          <Header />
          <AppBox className="root-layout__content">
            <Suspense fallback={<PageLoadingFallback />}>
              <Outlet />
            </Suspense>
          </AppBox>
          <Footer />
        </AppBox>
      </DrawerProvider>
    </ModalProvider>
  );
};

export default RootLayout;
