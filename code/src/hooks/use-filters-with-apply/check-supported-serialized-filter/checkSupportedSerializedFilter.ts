import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";

const checkRangeFilter = (value: object): value is RangeFilter<number> => {
  return "start" in value && "end" in value;
};

const checkSupportedSerializedFilter = (value: unknown) => {
  return (
    ["number", "string", "boolean"].includes(typeof value) ||
    value === null ||
    value === undefined ||
    value instanceof Set ||
    checkRangeFilter(value)
  );
};

export default checkSupportedSerializedFilter;
