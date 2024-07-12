import AppBox from "@/components/app-box/AppBox";
import { AppTableProps } from "@/components/app-table/AppTable.types";
import {
  AppTableBody,
  AppTableBox,
  AppTableContainer,
  AppTableHead,
  AppTableRow
} from "@/components/app-table/components";

import cn from "@/utils/cn/cn";

const AppTable = <TableContent,>({
  classNames,
  bodyItems,
  headItems,
  renderBodyItem,
  renderHeadItem,
  fallback
}: AppTableProps<TableContent>) => {
  const tableBody = bodyItems.map((item, i) => (
    <AppTableRow className={cn(classNames?.body)} key={i}>
      {renderBodyItem(item)}
    </AppTableRow>
  ));

  const tableFallback = !bodyItems.length && fallback && (
    <AppBox className={cn(classNames?.fallback)}>{fallback}</AppBox>
  );

  return (
    <AppBox>
      <AppTableContainer className={cn(classNames?.container)}>
        <AppTableBox>
          <AppTableHead className={cn(classNames?.head)}>
            <AppTableRow>{headItems.map(renderHeadItem)}</AppTableRow>
          </AppTableHead>
          <AppTableBody>{tableBody}</AppTableBody>
        </AppTableBox>
      </AppTableContainer>
      {tableFallback}
    </AppBox>
  );
};

export default AppTable;
