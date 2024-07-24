import { ReactNode } from "react";

import { TableSortLabelProps } from "@mui/material/TableSortLabel";


export type AppTableSortLabelProps = TableSortLabelProps & {
  sortDirection: 'asc' | 'desc';
  onSortClick?: () => void;
  children: ReactNode;
};
