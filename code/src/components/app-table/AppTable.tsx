import { ReactNode } from "react";

import {
  AppTableBody,
  AppTableBox,
  AppTableContainer,
  AppTableHead,
  AppTableRow
} from "@/components/app-table/components";

type AppTableProps<T> = {
  bodyItems: T[];
  headItems: string[];
  renderBodyItem: (item: T) => ReactNode;
  renderHeadItem: (item: string) => ReactNode;
};
const AppTable = <T,>({
  bodyItems,
  headItems,
  renderBodyItem,
  renderHeadItem
}: AppTableProps<T>) => {
  return (
    <AppTableContainer>
      <AppTableBox>
        <AppTableHead>
          <AppTableRow>{headItems.map(renderHeadItem)}</AppTableRow>
        </AppTableHead>
        <AppTableBody>{bodyItems.map(renderBodyItem)}</AppTableBody>
      </AppTableBox>
    </AppTableContainer>
  );
};

export default AppTable;
