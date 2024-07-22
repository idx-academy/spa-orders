import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";

// matches two integer or float numbers joined by dash, like following: 10-20, 5.5-10.25
const numberRangePattern = /^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/;

const parseSerializedRange = (value: string): RangeFilter<number> | null => {
  const match = value.match(numberRangePattern);

  if (match === null) {
    return null;
  }

  return {
    start: parseFloat(match[1]),
    end: parseFloat(match[2])
  };
};

export default parseSerializedRange;
