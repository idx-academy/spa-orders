import { FormattedMessage } from "react-intl";

export const sortOptions = [
  {
    value: "",
    label: <FormattedMessage id="productsDefault.label" />
  },
  {
    value: "product.createdAt,desc",
    label: <FormattedMessage id="sortOptions.newest" />
  },
  {
    value: "product.price,asc",
    label: <FormattedMessage id="sortOptions.priceLowHigh" />
  },
  {
    value: "product.price,desc",
    label: <FormattedMessage id="sortOptions.priceHighLow" />
  },
  { value: "name,asc", label: <FormattedMessage id="sortOptions.nameAZ" /> },
  { value: "name,desc", label: <FormattedMessage id="sortOptions.nameZA" /> }
];
