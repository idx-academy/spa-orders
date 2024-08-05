import checkWithinRange from "@/components/app-range-slider/utils/check-within-range/checkWithinRange";

type ParseRangeValues = {
  rangeStart: string;
  rangeEnd: string;
  min: number;
  max: number;
};

const parseRangeValues = ({
  rangeStart,
  rangeEnd,
  min,
  max
}: ParseRangeValues) => {
  const numericRangeStart = parseInt(rangeStart);
  const numericRangeEnd = parseInt(rangeEnd);

  const isRangeStartValueValid = !isNaN(numericRangeStart);
  const isRangeEndValueValid = !isNaN(numericRangeEnd);

  const isRangeStartInputValid = Boolean(
    checkWithinRange({
      value: numericRangeStart,
      min,
      max
    })
  );
  const isRangeEndInputValid = Boolean(
    checkWithinRange({
      value: numericRangeEnd,
      min,
      max
    })
  );

  return {
    sliderRange: [
      isRangeStartValueValid ? numericRangeStart : min,
      isRangeEndValueValid ? numericRangeEnd : max
    ],
    inputData: {
      start: {
        value: isRangeStartValueValid ? rangeStart : "",
        isValid: isRangeStartInputValid
      },
      end: {
        value: isRangeEndValueValid ? rangeEnd : "",
        isValid: isRangeEndInputValid
      }
    }
  };
};

export default parseRangeValues;
