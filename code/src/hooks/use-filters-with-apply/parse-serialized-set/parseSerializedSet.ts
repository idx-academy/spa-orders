import deserializeFromQueryString from "@/hooks/use-filters-with-apply/deserialize-from-query-string/deserializeFromQueryString";

// matches list of values, separated by comma and wrapped into brackets
// Examples: {1,2,3}, {delivered,completed}, {}, {value}
const serializedSetPattern = /^{((?:\w+(?:,\w+)*)?)}$/;

const parseSerializedSet = <Value>(value: string) => {
  const match = value.match(serializedSetPattern);

  const arrayMatch = match?.[1];

  if (arrayMatch === undefined) {
    return null;
  }

  if (arrayMatch === "") {
    return new Set<Value>();
  }

  const array = arrayMatch
    .split(",")
    .map((item) => deserializeFromQueryString(item)) as Value[];

  return new Set(array);
};

export default parseSerializedSet;
