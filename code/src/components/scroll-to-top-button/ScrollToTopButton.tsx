import { useEffect, useState } from "react";

import { ArrowUpward } from "@mui/icons-material";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";

import cn from "@/utils/cn/cn";

import "@/components/scroll-to-top-button/ScrollToTopButton.scss";

const SCROLL_THRESHOLD = 300;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      toggleVisibility();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBox className={cn(`spa-scroll-button`, isVisible && "visible")}>
      <AppIconButton
        size="large"
        onClick={scrollToTop}
        data-testid="scroll-button"
        role="button"
      >
        <ArrowUpward />
      </AppIconButton>
    </AppBox>
  );
};

export default ScrollToTopButton;
