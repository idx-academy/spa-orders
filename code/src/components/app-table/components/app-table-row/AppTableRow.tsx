import TableRow from "@mui/material/TableRow";

import { AppTableRowProps } from "@/components/app-table/components/app-table-row/AppTableRow.types";

const AppTableRow = (props: AppTableRowProps) => {
  return <TableRow {...props} />;
};

export default AppTableRow;
