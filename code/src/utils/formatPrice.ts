type FormatPriceOptions = {
  currency?: "USD" | "EUR" | "GBP" | "BDT";
  notation?: Intl.NumberFormatOptions["notation"];
};

const formatPrice = (price: number, options: FormatPriceOptions = {}) => {
  const { currency = "USD", notation = "standard" } = options;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(price);
};

export default formatPrice;
