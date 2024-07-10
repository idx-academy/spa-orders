import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { orderBadgeVariants } from "@/layouts/order-item/OrderItem.constants";
import OrderItemDetails from "@/layouts/order-item/components/order-item-details/OrderItemDetails";

import {
  AppAccordionContainer,
  AppAccordionDetails,
  AppAccordionSummary
} from "@/components/app-accordion/AppAccordion";
import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { Order } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/layouts/order-item/OrderItem.scss";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const orderItemStatus = orderStatusesTranslationKeys[order.orderStatus];

  const orderTotalPrice = order.orderItems.reduce(
    (accumulator, orderItem) => accumulator + orderItem.price,
    0
  );

  return (
    <AppAccordionContainer className="spa-order-item__container">
      <AppAccordionSummary
        className="spa-order-item__title"
        expandIcon={<ExpandMoreIcon />}
      >
        <AppBox className="spa-order-item__status">
          <AppTypography
            className="spa-order-item__status"
            variant="caption"
            fontWeight="extra-bold"
          >
            {formatDate(order.createdAt)}
          </AppTypography>
          <AppBadge
            variant={orderBadgeVariants[orderItemStatus]}
            badgeContent={
              <AppTypography variant="caption">{orderItemStatus}</AppTypography>
            }
          />
        </AppBox>

        <AppBox className="spa-order-item__payment-status">
          <AppTypography
            variant="caption"
            translationKey="orderProductItem.isPaid"
          />
          <AppTypography
            className="spa-order-item__payment-status"
            variant="body"
            fontWeight="extra-bold"
          >
            {formatPrice(orderTotalPrice)}
          </AppTypography>
        </AppBox>
      </AppAccordionSummary>
      <AppAccordionDetails>
        <OrderItemDetails order={order} />
      </AppAccordionDetails>
    </AppAccordionContainer>
  );
};

export default OrderItem;
