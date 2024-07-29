import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  initialSortOrder,
  sortKeyMap
} from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.constants";

import { AppTableCell } from "@/components/app-table/components";
import AppTableSortLabel from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel";
import AppTypography from "@/components/app-typography/AppTypography";

import { SortOrder } from "@/types/common";

import "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.scss";

type OrderTableHeadProps = {
  head: string;
};

const getSortKey = (head: string): string => {
  return sortKeyMap[head];
};

const OrdersTableHead = ({ head }: OrderTableHeadProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortDirections, setSortDirections] =
    useState<Record<string, SortOrder>>(initialSortOrder);

  const sortKey = getSortKey(head);

  const isActive = searchParams.get("sort")?.startsWith(sortKey);

  const sortDirection = isActive
    ? sortDirections[sortKey]
    : initialSortOrder[sortKey];

  const handleSort = () => {
    const newSortDirection =
      (isActive ? sortDirections[sortKey] : initialSortOrder[sortKey]) ===
      "desc"
        ? "asc"
        : "desc";

    setSortDirections((prevDirections) => ({
      ...prevDirections,
      [sortKey]: newSortDirection
    }));

    const newSort = `${sortKey},${newSortDirection}`;
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
  };

  useEffect(() => {
    if (!searchParams.has("sort")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("sort", "createdAt,desc");
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <AppTableCell className="spa-order-table__head">
      {sortKey ? (
        <AppTableSortLabel
          active={isActive}
          onClick={handleSort}
          sortDirection={sortDirection as SortOrder}
          className="spa-order-table__head-label"
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
