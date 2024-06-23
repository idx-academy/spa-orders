const cn = (...classNames: unknown[]) => {
  return classNames
    .filter((className) => typeof className === "string" && className !== "")
    .join(" ");
};

export default cn;
