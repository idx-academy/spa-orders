import TableSortLabel from "@mui/material/TableSortLabel";

import { AppTableSortLabelProps } from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel.types";

const AppTableSortLabel = ({
  className,
  sortDirection,
  onSortClick,
  children,
  ...props
}: AppTableSortLabelProps) => {
  return (
    <TableSortLabel
      className={className}
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
