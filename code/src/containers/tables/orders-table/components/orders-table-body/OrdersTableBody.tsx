import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { orderBadgeVariants } from "@/containers/order-item/OrderItem.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import { AppTableCell } from "@/components/app-table/components";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { ROLES } from "@/constants/common";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { orderDeliveryStatuses } from "@/constants/orderStatuses";
import routes from "@/constants/routes";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { AdminOrder, OrderIsPaid, OrderStatus } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody.scss";

type OrderTableBodyProps = {
  order: AdminOrder;
  onStatusChange: (status: OrderStatus) => void;
  onIsPaidChange: (isPaid: OrderIsPaid) => void;
};

const OrdersTableBody = ({
  order,
  onStatusChange,
  onIsPaidChange
}: OrderTableBodyProps) => {
  const {
    id,
    createdAt,
    total,
    orderStatus,
    isPaid,
    availableStatuses,
    receiver: { firstName, lastName, email },
    postAddress: { deliveryMethod }
  } = order;

  const user = useUserDetailsSelector();

  const orderReceiver = `${lastName} ${firstName}`;

  const userId = user?.id;
  const userRole = user?.role;
  const loginWithAdminRole = Boolean(userRole === ROLES.ADMIN && userId);
  const loginWithManagerRole = Boolean(
    userRole === ROLES.SHOP_MANAGER && userId
  );

  const filteredOrderStatuses: OrderStatus[] =
    availableStatuses.length > 0
      ? (Object.keys(orderStatusesTranslationKeys) as OrderStatus[]).filter(
          (status) => availableStatuses.includes(status)
        )
      : [];

  const adminOrderStatuses = Object.keys(
    orderStatusesTranslationKeys
  ) as OrderStatus[];
  const managerOrderStatuses = [orderStatus, ...filteredOrderStatuses];

  const orderStatusesForSelect = loginWithManagerRole
    ? managerOrderStatuses
    : adminOrderStatuses;

  const statusBlock = (
    <AppSelect
      defaultValue={orderStatus}
      value={orderStatus}
      className="spa-order-table__body-status-select"
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
      {orderStatusesForSelect.map((status) => {
        const orderBadgeItemStatus = (
          <AppTypography
            className="spa-order-table__body-status-text"
            variant="caption-small"
            translationKey={orderStatusesTranslationKeys[status as OrderStatus]}
          />
        );

        const handleStatusChange = () => {
          onStatusChange(status);
        };

        return (
          <AppMenuItem
            value={status}
            key={status}
            onClick={handleStatusChange}
            disabled={status === orderStatus}
          >
            <AppBadge
              variant={orderBadgeVariants[orderStatusesTranslationKeys[status]]}
              badgeContent={orderBadgeItemStatus}
            />
          </AppMenuItem>
        );
      })}
    </AppSelect>
  );

  const handleManagerIsPaidChange = () => {
    !isPaid && onIsPaidChange(true);
  };

  const handleAdminIsPaidChange = () => {
    onIsPaidChange(!isPaid);
  };

  const handleIsPaidChange = loginWithManagerRole
    ? handleManagerIsPaidChange
    : handleAdminIsPaidChange;

  const emailField = (
    <AppTypography variant="caption" className="spa-order-table__body-email">
      {email}
    </AppTypography>
  );

  const notPaidOrderCheckbox =
    orderStatus !== orderDeliveryStatuses.CANCELED ? (
      <AppTooltip
        followCursor
        titleTranslationKey="ordersTable.notpaid.tooltip"
      >
        <AppCheckbox
          className="spa-order-table__body-checkbox"
          onChange={handleIsPaidChange}
        />
      </AppTooltip>
    ) : (
      <AppTooltip
        followCursor
        titleTranslationKey="ordersTable.canceled.tooltip"
      >
        <AppCheckbox className="spa-order-table__body-checkbox" disabled />
      </AppTooltip>
    );

  const isPaidFieldForManagerRole = isPaid ? (
    <AppTooltip followCursor titleTranslationKey="ordersTable.ispaid.tooltip">
      <AppCheckbox
        className="spa-order-table__body-checkbox"
        checked
        disabled
      />
    </AppTooltip>
  ) : (
    notPaidOrderCheckbox
  );

  const isPaidFieldForAdminRole = (
    <AppCheckbox
      className="spa-order-table__body-checkbox"
      checked={isPaid}
      onChange={handleIsPaidChange}
    />
  );

  const isPaidField = loginWithAdminRole
    ? isPaidFieldForAdminRole
    : isPaidFieldForManagerRole;

  return (
    <>
      <AppTableCell>{orderReceiver}</AppTableCell>
      <AppTableCell>{emailField}</AppTableCell>
      <AppTableCell>{statusBlock}</AppTableCell>
      <AppTableCell>{formatDate(createdAt)}</AppTableCell>
      <AppTableCell>{deliveryMethod}</AppTableCell>
      <AppTableCell>{formatPrice(total)}</AppTableCell>
      <AppTableCell>{isPaidField}</AppTableCell>
      <AppTableCell>
        <AppLink to={routes.dashboard.orderDetails.path(id)}>
          <AppIconButton>
            <MoreHorizIcon />
          </AppIconButton>
        </AppLink>
      </AppTableCell>
    </>
  );
};

export default OrdersTableBody;
