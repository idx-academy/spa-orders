import TableCell from "@mui/material/TableCell";

import { AppTableCellProps } from "@/components/app-table/components/app-table-cell/AppTableCell.types";

const AppTableCell = (props: AppTableCellProps) => {
  return <TableCell {...props} />;
};

export default AppTableCell;
