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

  const updateSearchParams = (key: string, direction: SortOrder) => {
    const newSort = `${key},${direction}`;
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
  };

  const handleSort = () => {
    const currentSortDirection = isActive
      ? sortDirections[sortKey]
      : initialSortOrder[sortKey];
    const newSortDirection = currentSortDirection === "desc" ? "asc" : "desc";

    setSortDirections((prevDirections) => ({
      ...prevDirections,
      [sortKey]: newSortDirection
    }));

    updateSearchParams(sortKey, newSortDirection);
  };

  useEffect(() => {
    if (!searchParams.has("sort")) {
      updateSearchParams("createdAt", "desc");
    }
  }, [searchParams, setSearchParams]);

  return (
    <AppTableCell className="spa-order-table__head">
      {sortKey ? (
        <AppTableSortLabel
          data-cy={`table-head-${sortKey}-label`}
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
