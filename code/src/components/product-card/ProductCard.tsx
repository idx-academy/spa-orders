import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import AppLink from "@/components/app-link/AppLink";

import { Product } from "@/types/product.types";

import "@/components/product-card/ProductCard.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <AppLink key={product.id} to="/">
      <AppBox className="spa-product-card">
        <img
          className="spa-product-card__img"
          src={product.image}
          alt={product.name}
        />
        <AppBox>
          <AppTypography variant="caption">{product.name}</AppTypography>
          <AppTypography className="spa-product-card__price">
            {product.price}
          </AppTypography>
          <AppTypography className="spa-product-card__description">
            {product.description}
          </AppTypography>
        </AppBox>
      </AppBox>
    </AppLink>
  );
};

export default ProductCard;
