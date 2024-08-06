import AppContainer from "@/components/app-container/AppContainer";
import AppPagination from "@/components/app-pagination/AppPagination";

import cn from "@/utils/cn/cn";

import "@/containers/pagination-block/PaginationBlock.scss";

type PaginationBlockProps = {
  page?: number;
  totalPages?: number;
  className?: string;
};

const PaginationBlock = ({
  page = 1,
  totalPages = 1,
  className
}: PaginationBlockProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <AppContainer className={cn("pagination-block", className)}>
      <AppPagination page={page} count={totalPages} size="large" />
    </AppContainer>
  );
};

export default PaginationBlock;
