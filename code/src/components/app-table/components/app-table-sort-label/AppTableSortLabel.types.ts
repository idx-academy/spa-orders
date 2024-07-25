import { TableSortLabelProps } from "@mui/material/TableSortLabel";

import { SortOrder } from "@/types/common";

export type AppTableSortLabelProps = Omit<TableSortLabelProps, "direction"> & {
  sortDirection: SortOrder;
};
