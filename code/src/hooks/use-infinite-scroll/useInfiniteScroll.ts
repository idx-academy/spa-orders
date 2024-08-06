import { useCallback } from "react";

const useInfiniteScroll = (loadNextPage: () => void) => {
  return useCallback((item: HTMLLIElement | null) => {
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
