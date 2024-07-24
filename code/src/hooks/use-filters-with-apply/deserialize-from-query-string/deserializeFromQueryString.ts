import parseSerializedRange from "@/hooks/use-filters-with-apply/parse-serialized-range/parseSerializedRange";
import parseSerializedSet from "@/hooks/use-filters-with-apply/parse-serialized-set/parseSerializedSet";

const checkNumber = (value: string) => {
  return !isNaN(Number(value));
};

const deserializeFromQueryString = <Value>(queryString: string): Value => {
  if (queryString === "null") {
    return null as Value;
  }

  if (queryString === "true") {
    return true as Value;
  }

  if (queryString === "false") {
    return false as Value;
  }

  const isNumber = checkNumber(queryString);

  if (isNumber) {
    return Number(queryString) as Value;
  }

  const parsedSet = parseSerializedSet(queryString);

  if (parsedSet) {
    return parsedSet as Value;
  }

  const parsedRange = parseSerializedRange(queryString);

  if (parsedRange) {
    return parsedRange as Value;
  }

  return queryString as Value;
};

export default deserializeFromQueryString;
