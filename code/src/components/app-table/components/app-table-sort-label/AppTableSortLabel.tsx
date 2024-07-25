import TableSortLabel from "@mui/material/TableSortLabel";

import { AppTableSortLabelProps } from "@/components/app-table/components/app-table-sort-label/AppTableSortLabel.types";

const AppTableSortLabel = ({
  sortDirection,
  active,
  onClick,
  children,
  ...props
}: AppTableSortLabelProps) => {
  return (
    <TableSortLabel
      active={active}
      direction={sortDirection}
      onClick={onClick}
      {...props}
    >
      {children}
    </TableSortLabel>
  );
};
export default AppTableSortLabel;
