import AccordionSummary from "@mui/material/AccordionSummary";

import { AppAccordionSummaryProps } from "@/components/app-accordion/app-accordion-summary/AppAccordionSummary.types";

import "@/components/app-accordion/app-accorion-container/AppAccordionContainer.scss";

const AppAccordionSummary = (props: AppAccordionSummaryProps) => {
  return <AccordionSummary {...props} />;
};

export default AppAccordionSummary;
