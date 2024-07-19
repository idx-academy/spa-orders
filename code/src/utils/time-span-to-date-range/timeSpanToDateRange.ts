import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { TimeSpan } from "@/types/common";

const timeSpanToDateRange = (timeSpan: TimeSpan): RangeFilter<Date> => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  switch (timeSpan) {
    case "yesterday":
      start.setDate(now.getDate() - 1);
      end.setDate(now.getDate() - 1);
      break;
    case "last-month":
      start.setMonth(now.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case "last-two-weeks":
      start.setDate(now.getDate() - 14);
      break;
    case "last-week":
      start.setDate(now.getDate() - 7);
      break;
    default:
      throw new Error("Invalid time span");
  }

  return {
    start: start,
    end: end
  };
};

export default timeSpanToDateRange;
