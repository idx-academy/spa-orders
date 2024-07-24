import TableSortLabel from "@mui/material/TableSortLabel";

import { AppTableSortLabelProps } from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel.types";

const AppTableSortLabel = ({
  sortDirection,
  onSortClick,
  children,
  ...props
}: AppTableSortLabelProps) => {
  return (
    <TableSortLabel
      active
      direction={sortDirection}
      onClick={onSortClick}
      {...props}
    >
      {children}
    </TableSortLabel>
  );
};
export default AppTableSortLabel;
