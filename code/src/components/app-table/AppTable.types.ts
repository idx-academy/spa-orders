import { ReactNode } from "react";

type ClassNames = {
  container?: string;
  head?: string;
  body?: string;
  fallback?: string;
};

export type AppTableProps<T> = {
  classNames?: ClassNames;
  bodyItems: T[];
  headItems: string[];
  renderBodyItem: (item: T) => ReactNode;
  renderHeadItem: (item: string) => ReactNode;
  fallback?: ReactNode;
};
