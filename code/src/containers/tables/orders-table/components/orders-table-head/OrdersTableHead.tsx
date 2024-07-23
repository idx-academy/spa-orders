import { useState } from "react";

import { AppTableCell } from "@/components/app-table/components";
import AppTableSortLabel from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.scss";

type OrderTableHeadProps = {
  head: string;
  sortable?: boolean;
  onSortChange: (newSort: string) => void;
};

const OrdersTableHead = ({ head, onSortChange }: OrderTableHeadProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getSortKey = () => {
    switch (head) {
      case "ordersTable.columns.createdAt":
        return "createdAt";
      case "ordersTable.columns.totalPrice":
        return "total";
      default:
        return null;
    }
  };
  const sortKey = getSortKey();

  const handleSort = () => {
    if (sortKey !== null) {
      const newSort = `${sortKey},${sortDirection}`;
      onSortChange(newSort);
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    }
  };

  return (
    <AppTableCell className="spa-order-table__head">
      {sortKey !== null ? (
        <AppTableSortLabel
          active
          direction={sortDirection}
          onClick={handleSort}
        >
          <AppTypography translationKey={head} variant="caption" />
        </AppTableSortLabel>
      ) : (
        <AppTypography translationKey={head} variant="caption" />
      )}
    </AppTableCell>
  );
};

export default OrdersTableHead;
