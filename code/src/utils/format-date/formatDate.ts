type FormatDateOptions = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

const formatDate = (
  dateLike: string | Date,
  { locale = "en-GB", options = {} }: FormatDateOptions = {}
) => {
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);

  if (date.toString() === "Invalid Date") {
    return "Invalid date";
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Kiev"
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options
  }).format(date);
};

export default formatDate;
