import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import PageLoadingFallback from "@/layouts/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";

import "@/layouts/root-layout/RootLayout.scss";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
