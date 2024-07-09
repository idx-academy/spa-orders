import TableCell from "@mui/material/TableCell";

import { AppTableCellProps } from "@/components/app-table/components/app-table-cell/AppTableCell.types";

const AppTableCell = (props: AppTableCellProps) => {
  return <TableCell align="center" {...props} />;
};

export default AppTableCell;
