import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/products-table/components/products-table-head/ProductsTableHead.scss";

type ProductsTableHeadProps = {
  head: string;
};
const ProductsTableHead = ({ head }: ProductsTableHeadProps) => {
  return (
    <AppTableCell className="products-table__head">
      <AppTypography translationKey={head} variant="caption" />
    </AppTableCell>
  );
};

export default ProductsTableHead;
