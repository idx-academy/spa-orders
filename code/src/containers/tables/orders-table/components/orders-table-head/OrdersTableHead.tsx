import { useState } from "react";

import TableSortLabel from "@mui/material/TableSortLabel";

import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.scss";

type OrderTableHeadProps = {
  head: string;
  sortable?: boolean;
  onSortChange: (newSort: string) => void;
};

const OrdersTableHead = ({
  head,
  sortable = false,
  onSortChange
}: OrderTableHeadProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    if (sortable) {
      const newSort = `createdAt,${sortDirection}`;
      onSortChange(newSort);
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <AppTableCell className="spa-order-table__head">
      {sortable ? (
        <TableSortLabel active direction={sortDirection} onClick={handleSort}>
          <AppTypography translationKey={head} variant="caption" />
        </TableSortLabel>
      ) : (
        <AppTypography translationKey={head} variant="caption" />
      )}
    </AppTableCell>
  );
};

export default OrdersTableHead;
