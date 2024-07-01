type FormatDateOptions = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

const formatDate = (
  dateString: string,
  { locale = "en-GB", options = {} }: FormatDateOptions = {}
) => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options
  }).format(date);
};

export default formatDate;
