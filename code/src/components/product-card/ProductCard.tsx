import { useState } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";
import { ProductCardProps } from "@/components/product-card/ProductCard.types";

import cartIconWithCheck from "@/assets/icons/cart-with-check.svg";
import cartIconWithPlus from "@/assets/icons/cart-with-plus.svg";
import fallbackImage from "@/assets/images/default-product-image.png";
import routePaths from "@/constants/routes";
import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import cn from "@/utils/cn/cn";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/components/product-card/ProductCard.scss";

const ProductCard = ({ product }: ProductCardProps) => {
  const { isProductInCart, addToCartOrOpenDrawer } =
    useAddToCartOrOpenDrawer(product);
  const { id, name, image, price, description } = product;

  const [imgSrc, setImgSrc] = useState(image);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const cartIconId = isProductInCart ? "cart-with-check" : "cart-with-plus";
  const cartIconLink = isProductInCart ? cartIconWithCheck : cartIconWithPlus;
  const cartIconFullLink = `${cartIconLink}#${cartIconId}`;

  return (
    <AppBox
      data-testid="product-card"
      className="spa-product-card"
      data-cy="product-card"
    >
      <AppLink
        className="spa-product-card__link-wrapper"
        to={routePaths.productDetails.path(id)}
      >
        <AppBox className="spa-product-card__img">
          <AppBox
            alt={name}
            className="spa-product-card__img-name"
            data-cy="product-card-img"
            component="img"
            src={imgSrc}
            onError={handleImageError}
          />
          <AppBox
            className="spa-product-card__description"
            data-cy="product-card-description"
          >
            <AppTypography className="spa-product-card__description-text">
              {description}
            </AppTypography>
          </AppBox>
        </AppBox>
        <AppBox>
          <AppTypography
            variant="caption"
            className="spa-product-card__product-name"
          >
            {name}
          </AppTypography>
        </AppBox>
      </AppLink>
      <AppBox className="spa-product-card__footer">
        <AppTypography className="spa-product-card__footer-price">
          {formatPrice(price)}
        </AppTypography>
        <AppIconButton
          data-cy="add-to-cart-button"
          onClick={addToCartOrOpenDrawer}
          className={cn(
            "spa-product-card__cart-button",
            isProductInCart && "spa-product-card__cart-button--active"
          )}
        >
          <svg>
            <use data-testid="add-to-cart-icon" href={cartIconFullLink} />
          </svg>
        </AppIconButton>
      </AppBox>
    </AppBox>
  );
};

export default ProductCard;
