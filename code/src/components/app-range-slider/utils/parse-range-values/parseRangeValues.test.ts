import parseRangeValues from "@/components/app-range-slider/utils/parse-range-values/parseRangeValues";

type CallAndMock = {
  isWithinRange: boolean;
  rangeStart: string;
  rangeEnd: string;
  min: number;
  max: number;
};

const defaultValues: CallAndMock = {
  isWithinRange: true,
  rangeStart: "10",
  rangeEnd: "20",
  min: 0,
  max: 20000
};

const createParsedConfig = ({
  isRangeStartValid = true,
  isRangeEndValid = true
} = {}) => {
  const sliderRangeStart = !isRangeStartValid
    ? defaultValues.min
    : Number(defaultValues.rangeStart);

  const sliderRangeEnd = !isRangeEndValid
    ? defaultValues.max
    : Number(defaultValues.rangeEnd);

  return {
    sliderRange: [sliderRangeStart, sliderRangeEnd],
    inputData: {
      start: {
        value: isRangeStartValid ? defaultValues.rangeStart : "",
        isValid: isRangeStartValid
      },
      end: {
        value: isRangeEndValid ? defaultValues.rangeEnd : "",
        isValid: isRangeEndValid
      }
    }
  };
};

const callAndMock = (valuesFromArgs: Partial<CallAndMock> = {}) => {
  return parseRangeValues({ ...defaultValues, ...valuesFromArgs });
};

describe("parseRangeValues", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("parses valid range values within the range", () => {
    const result = callAndMock();

    expect(result).toEqual(createParsedConfig());
  });

  it("should handle invalid rangeStart value", () => {
    const result = callAndMock({ rangeStart: "invalid" });
    expect(result).toEqual(createParsedConfig({ isRangeStartValid: false }));
  });

  it("should handle invalid rangeEnd value", () => {
    const result = callAndMock({ rangeEnd: "invalid" });
    expect(result).toEqual(createParsedConfig({ isRangeEndValid: false }));
  });

  it("should handle both invalid rangeStart and rangeEnd values", () => {
    const result = callAndMock({ rangeStart: "invalid", rangeEnd: "invalid" });

    expect(result).toEqual(
      createParsedConfig({ isRangeStartValid: false, isRangeEndValid: false })
    );
  });
});
