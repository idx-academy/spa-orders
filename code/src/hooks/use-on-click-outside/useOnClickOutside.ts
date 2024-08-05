import { RefObject, useEffect } from "react";

type useOnClickOutsideHandlerEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: useOnClickOutsideHandlerEvent) => void
) => {
  useEffect(() => {
    const listener = (event: useOnClickOutsideHandlerEvent) => {
      const el = ref.current;
      if (!el || el.contains(event?.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
