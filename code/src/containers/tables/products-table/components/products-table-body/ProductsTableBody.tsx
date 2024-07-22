import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { productStatuToTranslationKeyMap } from "@/containers/tables/products-table/ProductsTable.constants";
import { ProductsTableBodyProps } from "@/containers/tables/products-table/ProductsTable.types";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";
import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";

import "@/containers/tables/products-table/components/products-table-body/ProductsTableBody.scss";

const ProductsTableBody = ({ product }: ProductsTableBodyProps) => {
  const { name, imageLink, price, quantity, status, tags, createdAt } = product;

  const categoryName = getCategoryFromTags(tags) || "-";

  const productStatus = (
    <AppTypography
      translationKey={productStatuToTranslationKeyMap[status]}
      variant="caption"
    />
  );

  const category = (
    <AppTypography
      translationKey={`category.${categoryName}`}
      variant="caption"
    />
  );

  const nameElement = (
    <AppTypography className="products-table__body-name" variant="caption">
      {name}
    </AppTypography>
  );

  return (
    <>
      <AppTableCell>
        <AppBox
          component="img"
          src={imageLink}
          className="products-table__body-image"
        />
      </AppTableCell>
      <AppTableCell>{nameElement}</AppTableCell>
      <AppTableCell>{productStatus}</AppTableCell>
      <AppTableCell>{category}</AppTableCell>
      <AppTableCell>{quantity}</AppTableCell>
      <AppTableCell>{formatPrice(price)}</AppTableCell>
      <AppTableCell>{formatDate(createdAt)}</AppTableCell>
      <AppTableCell>
        <AppIconButton>
          <MoreHorizIcon />
        </AppIconButton>
      </AppTableCell>
    </>
  );
};

export default ProductsTableBody;
