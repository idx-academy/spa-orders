import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import formatPrice from "@/utils/format-price/formatPrice";

import "@/components/order-summary/OrderSummary.scss";

type OrderSummaryProps = {
  totalPrice: number;
};

const OrderSummary = ({ totalPrice }: OrderSummaryProps) => {
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <AppBox className="spa-cart-page__order-summary">
      <AppTypography
        className="spa-cart-page__order-summary--label"
        variant="h1"
        component="h1"
        translationKey="orderSummary.label"
        data-testid="orderSummaryLabel"
      />
      <AppBox className="spa-order-summary__details">
        <AppBox className="spa-order-summary__row">
          <AppTypography
            className="spa-order-summary__text"
            translationKey="subtotal.label"
            data-testid="subtotalLabel"
          />
          <AppTypography
            className="spa-order-summary__text"
            variant="subtitle2"
          >
            {formattedTotalPrice}
          </AppTypography>
        </AppBox>
        <AppBox className="spa-order-summary__row">
          <AppTypography
            translationKey="delivery.label"
            data-testid="deliveryLabel"
          />
          <AppTypography translationKey="free.label" data-testid="freeLabel" />
        </AppBox>
        <AppTypography
          className="spa-order-summary__underline-text"
          translationKey="country.label"
          data-testid="countryLabel"
        />
        <AppBox className="spa-order-summary__row spa-order-summary__total-line">
          <AppTypography
            className="spa-order-summary__total"
            variant="subtitle2"
            translationKey="total.label"
            data-testid="totalLabel"
          />
          <AppTypography
            variant="subtitle2"
            className="spa-order-summary__total"
          >
            {formattedTotalPrice}
          </AppTypography>
        </AppBox>
      </AppBox>
      <AppButton
        className="spa-order-summary__button"
        variant="contained"
        size="medium"
        data-testid="createOrderButton"
      >
        <AppTypography translationKey="createOrder.label" />
      </AppButton>
    </AppBox>
  );
};

export default OrderSummary;
