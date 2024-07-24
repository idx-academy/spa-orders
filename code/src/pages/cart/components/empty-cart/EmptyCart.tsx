import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import cartIconWithPlus from "@/assets/icons/cart-with-plus.svg";
import routes from "@/constants/routes";

import "@/pages/cart/components/empty-cart/EmptyCart.scss";

const EmptyCart = () => {
  return (
    <PageWrapper>
      <AppBox className="empty-cart">
        <AppTypography
          className="empty-cart__title"
          variant="h3"
          translationKey="cartEmpty.label"
          data-testid="emptyCartLabel"
          data-cy="empty-cart-title"
        />
        <AppTypography
          translationKey="cartEmpty.subtitle"
          data-cy="empty-cart-subtitle"
        />
        <AppIconButton
          className="empty-cart__img"
          disableRipple
          component={AppLink}
          to={routes.products.path}
          data-cy="empty-cart-link"
        >
          <svg>
            <use href={`${cartIconWithPlus}#cart-with-plus`} />
          </svg>
        </AppIconButton>
      </AppBox>
    </PageWrapper>
  );
};

export default EmptyCart;
