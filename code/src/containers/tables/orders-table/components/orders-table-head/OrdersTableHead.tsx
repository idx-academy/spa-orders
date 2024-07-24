import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AppTableCell } from "@/components/app-table/components";
import AppTableSortLabel from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.scss";

type OrderTableHeadProps = {
  head: string;
};

const OrdersTableHead = ({ head }: OrderTableHeadProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortDirections, setSortDirections] = useState<{
    [key: string]: "asc" | "desc";
  }>({
    createdAt: "desc",
    total: "desc",
    orderStatus: "desc",
    isPaid: "desc",
   
  });

  const getSortKey = () => {
    switch (head) {
      case "ordersTable.columns.createdAt":
        return "createdAt";
      case "ordersTable.columns.totalPrice":
        return "total";
      case "ordersTable.columns.status":
        return "orderStatus";
      case "ordersTable.columns.isPaid":
        return "isPaid";

      default:
        return null;
    }
  };
  const sortKey = getSortKey();

  const handleSort = () => {
    if (sortKey !== null) {
      const newSortDirection =
        sortDirections[sortKey] === "desc" ? "asc" : "desc";

      setSortDirections((prevDirections) => ({
        ...prevDirections,
        [sortKey]: newSortDirection
      }));

      const newSort = `${sortKey},${newSortDirection}`;
      const params = new URLSearchParams(searchParams);
      params.set("sort", newSort);
      setSearchParams(params);
    }
  };

  const sortDirection = sortKey ? sortDirections[sortKey] : undefined;
  return (
    <AppTableCell className="spa-order-table__head">
      {sortKey !== null ? (
        <AppTableSortLabel
          active
          onClick={handleSort}
          sortDirection={sortDirection as "asc" | "desc"}
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
