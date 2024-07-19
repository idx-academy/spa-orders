const serializeToQueryString = <Value>(value: Value): string => {
  if (value === null) {
    return "null";
  }

  switch (typeof value) {
    case "number":
    case "string":
    case "boolean":
      return value.toString();
    case "object":
      if (value instanceof Set) {
        const serializedList = Array.from(value)
          .map((item) => serializeToQueryString(item))
          .join(",");

        return `{${serializedList}}`;
      }

      if ("start" in value && "end" in value) {
        return `${value.start}-${value.end}`;
      }

      throw new Error(`Type is not supported`);
    default:
      throw new Error(`Type is not supported`);
  }
};

export default serializeToQueryString;
