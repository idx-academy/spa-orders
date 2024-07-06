import { FormattedMessage } from "react-intl";

export const sortOptions = [
  {
    value: "recommended",
    label: <FormattedMessage id="productsDefault.label" />
  },
  {
    value: "createdAt,desc",
    label: <FormattedMessage id="sortOptions.newest" />
  },
  {
    value: "price,asc",
    label: <FormattedMessage id="sortOptions.priceLowHigh" />
  },
  {
    value: "price,desc",
    label: <FormattedMessage id="sortOptions.priceHighLow" />
  },
  { value: "name,asc", label: <FormattedMessage id="sortOptions.nameAZ" /> },
  { value: "name,desc", label: <FormattedMessage id="sortOptions.nameZA" /> }
];
