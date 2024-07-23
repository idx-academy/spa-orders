import { PropsWithChildren } from "react";

type FilterRecordAccordionClassName = "container" | "summary" | "details";
type FilterRecordAccordionClassNames = Partial<
  Record<FilterRecordAccordionClassName, string>
>;

export type FilterRecordAccordionProps = Required<PropsWithChildren> & {
  defaultExpanded?: boolean;
  sectionCaptionTranslationKey: string;
  className?: FilterRecordAccordionClassNames;
  isFilterActive?: boolean;
  resetFilter: () => void;
};
