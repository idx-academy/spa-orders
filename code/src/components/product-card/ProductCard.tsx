import AddIcon from "@mui/icons-material/Add";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";
import { ProductCardProps } from "@/components/product-card/ProductCard.types";

import formatPrice from "@/utils/format-price/formatPrice";

import "@/components/product-card/ProductCard.scss";

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <AppBox className="spa-product-card">
      <AppLink className="spa-product-card__link-wrapper" to="/">
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
      </AppLink>
      <AppBox className="spa-product-card__footer">
        <AppTypography className="spa-product-card__footer-price">
          {formatPrice(product.price)}
        </AppTypography>
        <AppButton size="small" variant="shadow" onClick={handleAddToCart}>
          <AddIcon />
          <AppTypography translationKey="productCard.add" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default ProductCard;
