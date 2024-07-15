import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
  const activeFilterIndicator = isFilterActive && (
    <FiberManualRecordIcon className="filter-record-accordion--filter-active-icon" />
  );

  return (
    <AppAccordionContainer
      className={cn("filter-record-accordion", className?.container)}
      defaultExpanded={defaultExpanded}
    >
      <AppAccordionSummary
        className={cn("filter-record-accordion__summary", className?.summary)}
        expandIcon={<ExpandMoreIcon />}
      >
        <AppTypography
          fontWeight="extra-bold"
          translationKey={sectionCaptionTranslationKey}
        />
        {activeFilterIndicator}
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
