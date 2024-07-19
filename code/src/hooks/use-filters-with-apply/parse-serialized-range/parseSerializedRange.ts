import deserializeFromQueryString from "../deserialize-from-query-string/deserializeFromQueryString";

const parseSerializedRange = (value: string) => {
  const match = value.match(/(\d+)-(\d+)/);

  if (match?.[1] && match?.[2]) {
    return {
      start: deserializeFromQueryString(match?.[1]),
      end: deserializeFromQueryString(match?.[2])
    };
  }
  return undefined;
};

export default parseSerializedRange;
