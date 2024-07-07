import { fireEvent, render, screen } from "@testing-library/react";

import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";

const SCROLL_THRESHOLD = 300;

describe("ScrollToTopButton", () => {
  let scrollButton: HTMLElement;

  beforeEach(() => {
    render(<ScrollToTopButton />);
    scrollButton = screen.getByTestId("scroll-button");
    window.scrollTo = jest.fn();
  });

  test("is not visible on initial render", () => {
    expect(scrollButton).not.toHaveClass("visible");
  });

  test("button shoud be visible when window is scrolled exactly to SCROLL_THRESHOLD", () => {
    fireEvent.scroll(window, { target: { scrollY: SCROLL_THRESHOLD } });
    expect(scrollButton).toHaveClass("visible");
  });

  test("scrolls to top when clicked", () => {
    fireEvent.scroll(window, { target: { scrollY: SCROLL_THRESHOLD + 1 } });
    fireEvent.click(scrollButton);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });

  test("should set isVisible to false when scrollY is less than or equal to threshold", () => {
    window.scrollY = SCROLL_THRESHOLD;
    fireEvent.scroll(window);
    expect(scrollButton).toHaveClass("visible");

    window.scrollY = SCROLL_THRESHOLD - 200;
    fireEvent.scroll(window);
    expect(scrollButton).not.toHaveClass("visible");
  });

  test("adds and removes scroll event listener", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<ScrollToTopButton />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
