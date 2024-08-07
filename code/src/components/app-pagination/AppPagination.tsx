import { MouseEvent } from "react";

import Pagination, {
  PaginationRenderItemParams
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { AppPaginationProps } from "@/components/app-pagination/AppPagination.types";

import usePagination from "@/hooks/use-pagination/usePagination";

const AppPagination = (props: AppPaginationProps) => {
  const { page, setPage } = usePagination();

  const renderPaginationItem = ({
    onClick,
    ...itemProps
  }: Omit<PaginationRenderItemParams, "selected">) => {
    const handlePageChange = (event: MouseEvent<HTMLDivElement>) => {
      setPage(itemProps.page);
      onClick(event);
    };

    return (
      <PaginationItem
        selected={page === itemProps.page}
        onClick={handlePageChange}
        data-cy="pagination"
        data-testid="pagination-button"
        {...itemProps}
      />
    );
  };

  return <Pagination renderItem={renderPaginationItem} {...props} />;
};

export default AppPagination;
