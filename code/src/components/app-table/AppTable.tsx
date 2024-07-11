import { ReactNode } from "react";

import AppBox from "@/components/app-box/AppBox";
import {
  AppTableBody,
  AppTableBox,
  AppTableContainer,
  AppTableHead,
  AppTableRow
} from "@/components/app-table/components";

import cn from "@/utils/cn/cn";

type ClassNames = {
  container?: string;
  head?: string;
  body?: string;
  fallback?: string;
};

type AppTableProps<T> = {
  classNames?: ClassNames;
  bodyItems: T[];
  headItems: string[];
  renderBodyItem: (item: T) => ReactNode;
  renderHeadItem: (item: string) => ReactNode;
  fallback?: ReactNode;
};

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
