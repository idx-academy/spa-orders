import AppBox from "@/components/app-box/AppBox";

import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";
import HeaderCategories from "@/layouts/header/components/header-categories/HeaderCategories";
import useStickyHeader from "@/layouts/header/hooks/use-sticky-header/useStickyHeader";

import "@/layouts/header/Header.scss";

const Header = () => {
  const { headerRef, scrollHandleRef } = useStickyHeader();

  return (
    <>
      <AppBox ref={scrollHandleRef} data-scroll-handle />
      <AppBox ref={headerRef} className="header">
        <HeaderToolbar />
        <HeaderCategories />
      </AppBox>
    </>
  );
};

export default Header;
