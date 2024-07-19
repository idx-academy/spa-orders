import { screen } from "@testing-library/react";

import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockHandleChange = jest.fn();

describe("AppRangeSlider", () => {
  describe("with default props", () => {
    beforeEach(() => {
      renderWithProviders(<AppRangeSlider />);
    });

    test("uses default props correctly", async () => {
      const rangeStartInput = screen.getByTestId("range-start");
      expect(rangeStartInput).toHaveAttribute("min", "0");
      expect(rangeStartInput).toHaveAttribute("max", "20000");
      expect(rangeStartInput).toHaveAttribute("step", "10");

      const rangeEndInput = screen.getByTestId("range-end");
      await typeIntoInput(rangeEndInput, 90);
      expect(rangeEndInput).toHaveValue(90);
    });

    test("changes input with default props correctly", async () => {
      const rangeEndInput = screen.getByTestId("range-end");
      const rangeStartInput = screen.getByTestId("range-start");

      await typeIntoInput(rangeEndInput, 90);
      await typeIntoInput(rangeStartInput, 15);

      expect(rangeEndInput).toHaveValue(90);
      expect(rangeStartInput).toHaveValue(15);
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

    test("renderWithProviderss correctly", () => {
      const rangeStartInput = screen.getByTestId("range-start");
      expect(rangeStartInput).toBeInTheDocument();

      const rangeEndInput = screen.getByTestId("range-end");
      expect(rangeEndInput).toBeInTheDocument();

      const rangeSlider = screen.getByTestId("range-slider");
      expect(rangeSlider).toBeInTheDocument();
    });

    test("triggers range start value change when correspoinding number input is changed", async () => {
      const rangeStartInput = screen.getByTestId("range-start");
      await typeIntoInput(rangeStartInput, 20);

      expect(mockHandleChange).toHaveBeenCalledWith(
        expect.any(Object),
        [20, 40]
      );
    });

    test("triggers range end value change when correspoinding number input is changed", async () => {
      const rangeEndInput = screen.getByTestId("range-end");
      await typeIntoInput(rangeEndInput, 90);

      expect(mockHandleChange).toHaveBeenCalledWith(
        expect.any(Object),
        [10, 90]
      );
    });

    test("triggers value change when range input is changes", async () => {
      const sliders = screen.getAllByRole("slider");

      await typeIntoInput(sliders[0], 60);

      expect(mockHandleChange).toHaveBeenCalledTimes(3);
    });
  });
});
