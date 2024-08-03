import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

import { useOnClickOutside } from "./useOnClickOutside";

const TestComponent = ({
  onClickOutside
}: {
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClickOutside);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

let removeEventListenerSpy: jest.SpyInstance;
let handleClickOutside: jest.Mock;

const setup = () => {
  handleClickOutside = jest.fn();
  const utils = render(<TestComponent onClickOutside={handleClickOutside} />);
  return { ...utils };
};

describe("useOnClickOutside", () => {
  beforeEach(() => {
    removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    removeEventListenerSpy.mockRestore();
  });

  test("removes event listeners on unmount", () => {
    const { unmount } = setup();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );
  });

  test("calls handler when clicking outside the element", () => {
    setup();
    const outsideElement = screen.getByTestId(/outside/);

    fireEvent.mouseDown(outsideElement);
    expect(handleClickOutside).toHaveBeenCalled();
  });

  test("does not call handler when clicking inside the element", () => {
    setup();
    const insideElement = screen.getByTestId(/inside/);

    fireEvent.mouseDown(insideElement);
    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  test("calls handler when touchstart outside the element", () => {
    setup();
    const outsideElement = screen.getByTestId(/outside/);

    fireEvent.touchStart(outsideElement);
    expect(handleClickOutside).toHaveBeenCalled();
  });

  test("does not call handler when touchstart inside the element", () => {
    setup();
    const insideElement = screen.getByTestId(/inside/);

    fireEvent.touchStart(insideElement);
    expect(handleClickOutside).not.toHaveBeenCalled();
  });
});
