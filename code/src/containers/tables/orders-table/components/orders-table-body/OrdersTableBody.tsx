import DoneIcon from "@mui/icons-material/Done";
import { MenuItem } from "@mui/material";

import { orderBadgeVariants } from "@/containers/order-item/OrderItem.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import AppSelect from "@/components/app-select/AppSelect";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { AdminOrder, OrderStatus } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody.scss";

type OrderTableBodyProps = {
  order: AdminOrder;
  onStatusChange: (status: OrderStatus) => void;
};

const OrdersTableBody = ({ order, onStatusChange }: OrderTableBodyProps) => {
  const {
    id,
    createdAt,
    total,
    orderStatus,
    receiver: { firstName, lastName },
    postAddress: { deliveryMethod },
    isPaid
  } = order;

  const orderReceiver = `${lastName} ${firstName}`;

  const statusBlock = (
    <AppSelect
      labelId="order-status"
      defaultValue={orderStatus}
      value={orderStatus}
      IconComponent={() => null}
      className="spa-order-table__body-status-select"
      data-testid="order-status"
      MenuProps={{
        PaperProps: {
          className: "spa-order-table__body-status-select",
          "data-testid": "order-status-menu"
        }
      }}
      inputProps={{
        className: "spa-order-table__body-status-select-input",
        "data-testid": "order-status-input"
      }}
    >
      {Object.keys(orderStatusesTranslationKeys).map((status) => {
        const orderBadgeItemStatus = (
          <AppTypography
            className="spa-order-table__body-status-text"
            variant="caption"
            translationKey={orderStatusesTranslationKeys[status as OrderStatus]}
          />
        );

        const handleStatusChange = () => {
          onStatusChange(status as OrderStatus);
        };

        return (
          <MenuItem value={status} key={status} onClick={handleStatusChange}>
            <AppBadge
              variant={
                orderBadgeVariants[
                  orderStatusesTranslationKeys[status as OrderStatus]
                ]
              }
              badgeContent={orderBadgeItemStatus}
            />
          </MenuItem>
        );
      })}
    </AppSelect>
  );

  return (
    <>
      <AppTableCell>{id}</AppTableCell>
      <AppTableCell>{statusBlock}</AppTableCell>
      <AppTableCell>{formatDate(createdAt)}</AppTableCell>
      <AppTableCell>{orderReceiver}</AppTableCell>
      <AppTableCell>{deliveryMethod}</AppTableCell>
      <AppTableCell>{formatPrice(total)}</AppTableCell>
      <AppTableCell>{isPaid && <DoneIcon color="success" />}</AppTableCell>
    </>
  );
};

export default OrdersTableBody;
