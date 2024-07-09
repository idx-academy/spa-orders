import TableContainer from "@mui/material/TableContainer";

import { AppTableContainerProps } from "@/components/app-table/components/app-table-container/AppTableContainer.types";

import "@/components/app-table/components/app-table-container/AppTableContainer.scss";

const AppTableContainer = (props: AppTableContainerProps) => {
  return <TableContainer className="spa-table-container" {...props} />;
};

export default AppTableContainer;
