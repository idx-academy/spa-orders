import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AppAccordionContainer,
  AppAccordionDetails,
  AppAccordionSummary
} from "@/components/app-accordion/AppAccordion";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import OrderItemDetails from "@/layouts/order-item/components/order-item-details/OrderItemDetails";

import { Order } from "@/types/order.types";
import { orderStatuses } from "@/constants/orderStatuses";
import formatPrice from "@/utils/formatPrice";
import formatDate from "@/utils/format-date/formatDate";

import "@/layouts/order-item/OrderItem.scss";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const orderItemStatus = orderStatuses[order.orderStatus];

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
          {/*@TODO: add badge component instead */}
          <AppTypography variant="caption">{orderItemStatus}</AppTypography>
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
