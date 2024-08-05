import { screen } from "@testing-library/react";

import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";
import parseRangeValues from "@/components/app-range-slider/utils/parse-range-values/parseRangeValues";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockHandleChange = jest.fn();

jest.mock(
  "@/components/app-range-slider/utils/parse-range-values/parseRangeValues",
  () => ({
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(
        jest.requireActual(
          "@/components/app-range-slider/utils/parse-range-values/parseRangeValues"
        ).default
      )
  })
);

type MockAndRender = {
  isStartInputValid?: boolean;
  isEndInputValid?: boolean;
};

const mockAndRender = ({
  isStartInputValid,
  isEndInputValid
}: MockAndRender = {}) => {
  if (isStartInputValid !== undefined || isEndInputValid !== undefined) {
    (parseRangeValues as jest.Mock).mockReturnValueOnce({
      sliderRange: [0, 20000],
      inputData: {
        start: {
          isValid: isStartInputValid,
          value: 10
        },
        end: {
          isValid: isEndInputValid,
          value: 40
        }
      }
    });
  }

  return renderWithProviders(<AppRangeSlider />);
};

describe("AppRangeSlider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("with default props", () => {
    test("highlights rangeStartInput with red when it is invalid", () => {
      mockAndRender({ isStartInputValid: false, isEndInputValid: true });

      const rangeStartInputElement = screen
        .getByTestId("range-start")
        .closest(".Mui-error");

      const rangeEndInputElement = screen
        .queryByTestId("range-end")
        ?.closest(".Mui-error");

      expect(rangeStartInputElement).toBeInTheDocument();
      expect(rangeEndInputElement).not.toBeInTheDocument();
    });

    test("highlights rangeEndInput with red when it is invalid", () => {
      mockAndRender({ isStartInputValid: true, isEndInputValid: false });

      const elementWithErrorClass = screen
        .getByTestId("range-end")
        .closest(".Mui-error");

      expect(elementWithErrorClass).toBeInTheDocument();
    });

    test("uses default props correctly", async () => {
      const { rerender } = mockAndRender();

      const rangeSlider = screen
        .getByTestId("range-slider")
        .querySelector("input");

      expect(rangeSlider).toHaveAttribute("min", "0");
      expect(rangeSlider).toHaveAttribute("max", "20000");

      const rangeEndInput = screen.getByTestId("range-end");

      await typeIntoInput(rangeEndInput, 90);

      rerender(<AppRangeSlider value={[0, 90]} />);
      expect(rangeEndInput).toHaveValue(90);
    });

    test("changes input with default props correctly", async () => {
      const { rerender } = mockAndRender();

      const rangeStartInput = screen.getByTestId("range-start");
      const rangeEndInput = screen.getByTestId("range-end");

      await typeIntoInput(rangeStartInput, "15");
      await typeIntoInput(rangeEndInput, "90");

      rerender(<AppRangeSlider value={[15, 90]} />);

      expect(rangeStartInput).toHaveValue(15);
      expect(rangeEndInput).toHaveValue(90);
    });
  });

  describe("with ordinary props", () => {
    beforeEach(() => {
      renderWithProviders(
        <AppRangeSlider
          value={[10, 40]}
          min={0}
          max={100}
          step={10}
          onChange={mockHandleChange}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("renders correctly", () => {
      const rangeStartInput = screen.getByTestId("range-start");
      expect(rangeStartInput).toBeInTheDocument();

      const rangeEndInput = screen.getByTestId("range-end");
      expect(rangeEndInput).toBeInTheDocument();

      const rangeSlider = screen.getByTestId("range-slider");
      expect(rangeSlider).toBeInTheDocument();
    });

    test("triggers range start value change when correspoinding number input is changed", async () => {
      const rangeStartInput = screen.getByTestId("range-start");
      await typeIntoInput(rangeStartInput, "20");

      expect(mockHandleChange).toHaveBeenCalledWith(["20", "40"]);
    });

    test("triggers range end value change when correspoinding number input is changed", async () => {
      const rangeEndInput = screen.getByTestId("range-end");
      await typeIntoInput(rangeEndInput, "90");

      expect(mockHandleChange).toHaveBeenCalledWith(["10", "90"]);
    });

    test("triggers value change when range input is changes", async () => {
      const sliders = screen.getAllByRole("slider");
      await typeIntoInput(sliders[0], "60");

      expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });
  });
});
