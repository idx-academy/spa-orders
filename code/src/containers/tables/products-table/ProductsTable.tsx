import { productsTableColumns } from "@/containers/tables/products-table/ProductsTable.constants";
import { ProductsTableProps } from "@/containers/tables/products-table/ProductsTable.types";
import ProductsTableBody from "@/containers/tables/products-table/components/products-table-body/ProductsTableBody";
import ProductsTableHeadCell from "@/containers/tables/products-table/components/products-table-head/ProductsTableHead";

import AppTable from "@/components/app-table/AppTable";
import AppTypography from "@/components/app-typography/AppTypography";

import { ManagerProduct } from "@/types/product.types";

import "@/containers/tables/products-table/ProductsTable.scss";

const ProductsTable = ({ products }: ProductsTableProps) => {
  const ProductsTableBodyItem = (product: ManagerProduct) => {
    return <ProductsTableBody product={product} />;
  };

  const ProductsTableHeadItem = (head: string) => (
    <ProductsTableHeadCell head={head} key={head} />
  );

  const productsTableFallback = (
    <AppTypography
      textAlign="center"
      variant="subtitle1"
      translationKey="productsTable.fallback"
    />
  );

  return (
    <AppTable<ManagerProduct>
      classNames={{
        container: "products-table",
        body: "products-table__body",
        fallback: "products-table__fallback"
      }}
      headItems={productsTableColumns}
      bodyItems={products}
      fallback={productsTableFallback}
      renderBodyItem={ProductsTableBodyItem}
      renderHeadItem={ProductsTableHeadItem}
    />
  );
};

export default ProductsTable;
