import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

import { useOnClickOutside } from "@/hooks/use-on-click-outside/useOnClickOutside";

type TestComponentProps = {
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
};

const TestComponent = ({ onClickOutside }: TestComponentProps) => {
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
  return render(<TestComponent onClickOutside={handleClickOutside} />);
};

describe("useOnClickOutside", () => {
  describe("with mounted component", () => {
    beforeEach(() => {
      setup();
    });

    test("calls handler when clicking outside the element", () => {
      const outsideElement = screen.getByTestId(/outside/);

      fireEvent.mouseDown(outsideElement);
      expect(handleClickOutside).toHaveBeenCalled();
    });

    test("does not call handler when clicking inside the element", () => {
      const insideElement = screen.getByTestId(/inside/);

      fireEvent.mouseDown(insideElement);
      expect(handleClickOutside).not.toHaveBeenCalled();
    });

    test("calls handler when touchstart outside the element", () => {
      const outsideElement = screen.getByTestId(/outside/);

      fireEvent.touchStart(outsideElement);
      expect(handleClickOutside).toHaveBeenCalled();
    });

    test("does not call handler when touchstart inside the element", () => {
      const insideElement = screen.getByTestId(/inside/);

      fireEvent.touchStart(insideElement);
      expect(handleClickOutside).not.toHaveBeenCalled();
    });
  });

  describe("with unmounted component", () => {
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
  });
});
