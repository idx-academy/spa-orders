import deserializeFromQueryString from "@/hooks/use-filters-with-apply/deserialize-from-query-string/deserializeFromQueryString";

const parseSerializedSet = (value: string) => {
  const match = value.match(/^{((?:\w+(?:,\w+)*)?)}$/);

  const arrayMatch = match?.[1];

  if (arrayMatch === "") {
    return new Set();
  }

  if (arrayMatch !== undefined) {
    const array = arrayMatch
      .split(",")
      .map((item) => deserializeFromQueryString(item));

    return new Set(array);
  }

  return undefined;
};

export default parseSerializedSet;
