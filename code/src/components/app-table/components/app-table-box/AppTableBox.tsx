import Table from "@mui/material/Table";

import { AppTableBoxProps } from "@/components/app-table/components/app-table-box/AppTableBox.types";

const AppTableBox = (props: AppTableBoxProps) => {
  return <Table {...props} />;
};

export default AppTableBox;
