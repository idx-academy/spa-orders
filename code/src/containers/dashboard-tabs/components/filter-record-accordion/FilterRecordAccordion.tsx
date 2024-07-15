import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FilterRecordAccordionProps } from "@/containers/dashboard-tabs/components/filter-record-accordion/FilterAccordion.types";

import {
  AppAccordionContainer,
  AppAccordionDetails,
  AppAccordionSummary
} from "@/components/app-accordion/AppAccordion";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/containers/dashboard-tabs/components/filter-record-accordion/FilterRecordAccordion.scss";

const FilterRecordAccordion = ({
  sectionCaptionTranslationKey,
  defaultExpanded = true,
  isFilterActive = false,
  children,
  className
}: FilterRecordAccordionProps) => {
  // @TODO: Add active filter indicator icon (from mui for example)
  const activeFilterIndicator = isFilterActive && <div></div>;

  return (
    <AppAccordionContainer
      className={cn("filter-record-accordion", className?.container)}
      defaultExpanded={defaultExpanded}
    >
      <AppAccordionSummary
        className={cn("filter-record-accordion__summary", className?.summary)}
        expandIcon={<ExpandMoreIcon />}
      >
        {activeFilterIndicator}
        <AppTypography
          fontWeight="extra-bold"
          translationKey={sectionCaptionTranslationKey}
        />
      </AppAccordionSummary>
      <AppAccordionDetails
        className={cn("filter-record-accordion__details", className?.summary)}
      >
        {children}
      </AppAccordionDetails>
    </AppAccordionContainer>
  );
};

export default FilterRecordAccordion;
