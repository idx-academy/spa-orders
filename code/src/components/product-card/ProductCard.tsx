import { useEffect, useState } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";
import { ProductCardProps } from "@/components/product-card/ProductCard.types";

import OutlinedCart from "@/assets/icons/CartOutlined";
import CartWithCheck from "@/assets/icons/CartWithCheck";
import cn from "@/utils/cn/cn";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/components/product-card/ProductCard.scss";

const ProductCard = ({ product, onCartIconClick }: ProductCardProps) => {
  const [isInCart, setIsInCart] = useState(product.isInCart);

  useEffect(() => {
    setIsInCart(product.isInCart);
  }, [product.isInCart]);

  const handleCartIconClick = () => {
    setIsInCart((prev) => !prev);
    onCartIconClick(product);
  };

  const carticon = isInCart ? <CartWithCheck /> : <OutlinedCart />;

  return (
    <AppBox data-testid="product-card" className="spa-product-card" data-cy="product-card">
      <AppLink className="spa-product-card__link-wrapper" to="/">
        <AppBox className="spa-product-card__img">
          <AppBox
            alt={product.name}
            className="spa-product-card__img-name"
            component="img"
            src={product.image}
            data-cy="product-card-img"
          />
          <AppBox
            className="spa-product-card__description"
            data-cy="product-card-description"
          >
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
        <AppIconButton
          onClick={handleCartIconClick}
          className={cn(
            "spa-product-card__cart-button",
            isInCart && "spa-product-card__cart-button_active"
          )}
        >
          {carticon}
        </AppIconButton>
      </AppBox>
    </AppBox>
  );
};

export default ProductCard;
