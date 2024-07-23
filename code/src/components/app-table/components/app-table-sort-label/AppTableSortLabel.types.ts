import { TableSortLabelProps } from "@mui/material/TableSortLabel";

export type AppTableSortLabelProps = TableSortLabelProps & {
  className?: string,
  sortDirection?: "asc" | "desc";
  onSortClick?: () => void;
};
