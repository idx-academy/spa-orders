import { FormattedMessage } from "react-intl";

export const sortOptions = [
  {
    value: "recommended",
    label: <FormattedMessage id="productsDefault.label" />
  },
  { value: "newest", label: <FormattedMessage id="sortOptions.newest" /> },
  {
    value: "priceLowHigh",
    label: <FormattedMessage id="sortOptions.priceLowHigh" />
  },
  {
    value: "priceHighLow",
    label: <FormattedMessage id="sortOptions.priceHighLow" />
  },
  { value: "nameAZ", label: <FormattedMessage id="sortOptions.nameAZ" /> },
  { value: "nameZA", label: <FormattedMessage id="sortOptions.nameZA" /> }
];
