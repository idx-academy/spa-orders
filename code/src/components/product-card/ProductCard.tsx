import AddIcon from "@mui/icons-material/Add";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import AppLink from "@/components/app-link/AppLink";
import AppButton from "@/components/app-button/AppButton";
import { Product } from "@/types/product.types";

import "@/components/product-card/ProductCard.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <AppLink key={product.id} to="/">
      <AppBox className="spa-product-card">
        <AppBox className="spa-product-card__img">
          <AppBox
            alt={product.name}
            className="spa-product-card__img-name"
            component="img"
            src={product.image}
          />
          <AppBox className="spa-product-card__description">
            <AppTypography>{product.description}</AppTypography>
          </AppBox>
        </AppBox>
        <AppBox>
          <AppTypography variant="caption">{product.name}</AppTypography>
        </AppBox>
        <AppBox className="spa-product-card__footer">
          <AppTypography className="spa-product-card__footer-price">
            {product.price}$
          </AppTypography>
          <AppButton size="small" variant="shadow">
            <AddIcon />
            <AppTypography translationKey="productCard.add" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppLink>
  );
};

export default ProductCard;
