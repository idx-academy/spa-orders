import { ReactNode } from "react";

import { TableSortLabelProps } from "@mui/material/TableSortLabel";

import { SortOrder } from "@/types/common";

export type AppTableSortLabelProps = Omit<
  TableSortLabelProps,
  "active" | "direction" | "onClick"
> & {
  sortDirection: SortOrder;
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};
