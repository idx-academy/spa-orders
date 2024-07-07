import { useEffect, useState } from "react";

import ArrowUpward from "@mui/icons-material/ArrowUpward";

import AppIconButton from "@/components/app-icon-button/AppIconButton";

import cn from "@/utils/cn/cn";

import "@/components/scroll-to-top-button/ScrollToTopButton.scss";

const SCROLL_THRESHOLD = 300;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsVisible]);

  return (
    <AppIconButton
      size="large"
      onClick={scrollToTop}
      data-testid="scroll-button"
      role="button"
      className={cn(`spa-scroll-button`, isVisible && "visible")}
    >
      <ArrowUpward />
    </AppIconButton>
  );
};

export default ScrollToTopButton;
