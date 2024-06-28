import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AppAccordionContainer,
  AppAccordionDetails,
  AppAccordionSummary
} from "@/components/app-accordion/AppAccordion";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";

import { Order } from "@/types/order.types";
import { orderStatus } from "@/constants/orderStatus";

import "@/layouts/order-item/OrderItem.scss";
import OrderItemDetails from "./components/order-item-details/OrderItemDetails";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const orderItemStatus = orderStatus[order.orderStatus];

  const orderTotalPrice = order.orderItems.reduce(
    (accumulator, orderItem) => accumulator + orderItem.price,
    0
  );

  //Create a custom utility function for that
  const orderDateCreation = new Date(order.createdAt).toLocaleString();

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
            {orderDateCreation}
          </AppTypography>
          {/*@TODO: add badge component instead */}
          <AppTypography variant="caption">{orderItemStatus}</AppTypography>
        </AppBox>

        <AppBox className="spa-order-item__payment-status">
          <AppTypography variant="caption">isPaid:</AppTypography>
          <AppTypography
            className="spa-order-item__payment-status"
            variant="body"
            fontWeight="extra-bold"
          >
            {/*It will be replaced by the utility function*/}
            {orderTotalPrice}$
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
