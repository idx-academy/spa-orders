import { ReactNode } from "react";

import {
  AppTableBody,
  AppTableBox,
  AppTableContainer,
  AppTableHead,
  AppTableRow
} from "@/components/app-table/components";

import cn from "@/utils/cn/cn";

type classNames = {
  container?: string;
  head?: string;
  body?: string;
};

type AppTableProps<T> = {
  classNames?: classNames;
  bodyItems: T[];
  headItems: string[];
  renderBodyItem: (item: T) => ReactNode;
  renderHeadItem: (item: string) => ReactNode;
};

const AppTable = <T,>({
  classNames,
  bodyItems,
  headItems,
  renderBodyItem,
  renderHeadItem
}: AppTableProps<T>) => {
  return (
    <AppTableContainer className={cn(classNames?.container)}>
      <AppTableBox>
        <AppTableHead className={cn(classNames?.head)}>
          <AppTableRow>{headItems.map(renderHeadItem)}</AppTableRow>
        </AppTableHead>
        <AppTableBody>
          {bodyItems.map((item, i) => (
            <AppTableRow className={cn(classNames?.body)} key={i}>
              {renderBodyItem(item)}
            </AppTableRow>
          ))}
        </AppTableBody>
      </AppTableBox>
    </AppTableContainer>
  );
};

export default AppTable;
