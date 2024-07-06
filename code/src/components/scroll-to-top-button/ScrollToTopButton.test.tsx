import { fireEvent, render, screen } from "@testing-library/react";

import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";

const SCROLL_THRESHOLD = 400;

describe("ScrollToTopButton", () => {
  let scrollButton: HTMLElement;
  window.scrollTo = jest.fn();

  beforeEach(() => {
    render(<ScrollToTopButton />);
    scrollButton = screen.getByTestId("scroll-button");
  });

  test("is not visible on initial render", () => {
    expect(scrollButton).not.toHaveClass("visible");
  });

  test("becomes visible after scrolling down past threshold", () => {
    fireEvent.scroll(window, { target: { scrollY: SCROLL_THRESHOLD + 1 } });
    expect(scrollButton.parentElement).toHaveClass("visible");
  });

  test("scrolls to top when clicked", () => {
    fireEvent.scroll(window, { target: { scrollY: SCROLL_THRESHOLD + 1 } });
    fireEvent.click(scrollButton);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
    expect(scrollButton).not.toHaveClass("visible");
  });

  test("should set isVisible to false when scrollY is less than or equal to threshold", () => {
    const { container } = render(<ScrollToTopButton />);
    expect(container.querySelector(".spa-scroll-button")).not.toHaveClass(
      "visible"
    );
    window.scrollY = SCROLL_THRESHOLD;
    fireEvent.scroll(window);
    expect(container.querySelector(".spa-scroll-button")).toHaveClass(
      "visible"
    );
    window.scrollY = SCROLL_THRESHOLD - 200;
    fireEvent.scroll(window);
    expect(container.querySelector(".spa-scroll-button")).not.toHaveClass(
      "visible"
    );
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
