import { useCallback } from "react";

const useInfiniteScroll = <Element extends HTMLElement>(
  loadNextPage: () => void
) => {
  return useCallback((item: Element | null) => {
    if (item == null) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadNextPage();
        observer.unobserve(item);
      }
    });
    observer.observe(item);
  }, []);
};

export default useInfiniteScroll;
