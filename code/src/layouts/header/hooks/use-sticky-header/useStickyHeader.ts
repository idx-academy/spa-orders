import { useEffect, useRef } from "react";

const useStickyHeader = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const scrollHandleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    const targetElement = scrollHandleRef.current;

    if (!headerElement || !targetElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const headerHeight = `-${headerElement.clientHeight + 210}px`;
          headerElement.style.setProperty("--top", headerHeight);
        } else {
          headerElement.style.setProperty("--top", "0");
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(targetElement);

    return () => observer.unobserve(targetElement);
  }, []);

  return { headerRef, scrollHandleRef } as const;
};

export default useStickyHeader;
