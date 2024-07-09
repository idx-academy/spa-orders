import TableHead from "@mui/material/TableHead";

import { AppTableHeadProps } from "@/components/app-table/components/app-table-head/AppTableHead.types";

const AppTableHead = (props: AppTableHeadProps) => {
  return <TableHead {...props} />;
};

export default AppTableHead;
