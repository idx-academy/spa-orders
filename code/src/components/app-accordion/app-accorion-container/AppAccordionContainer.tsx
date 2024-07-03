import Accordion from "@mui/material/Accordion";
import { AppAccordionProps } from "@/components/app-accordion/app-accorion-container/AppAccordionContainer.types";
import cn from "@/utils/cn/cn";

import "@/components/app-accordion/app-accorion-container/AppAccordionContainer.scss";

const AppAccordionContainer = ({ className, ...props }: AppAccordionProps) => {
  return (
    <Accordion
      classes={{ expanded: "spa-accordion-container--expanded" }}
      className={cn("spa-accordion-container", className)}
      {...props}
    />
  );
};

export default AppAccordionContainer;
